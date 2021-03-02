import { createCustomError } from "@42px/custom-errors"
import { forward } from "effector"
import matrix from "matrix-js-sdk"
import {
    initStoreFx,
    loginByPasswordFx,
    deleteMessageFx,
    searchMessageTextFx,
    sendMessageFx,
    startClientFx,
    editMessageFx,
    getRoomTimelineFx,
    loginByTokenFx,
    stopClientFx,
    initTimelineWindowFx,
    getTimelineWindowMessagesFx,
    paginateTimelineWindowFx,
    searchFx,
    loadTimelineWindowFx,
    readAllMessagesFx,
    getRoomsWithActivitiesFx,
    getRoomInfoFx
} from "./effects"
import { onCachedState, onInitialSync, onSync, roomMessage } from "./events"
import {
    mergeMessageEvents,
    toMappedRoom,
    toMessage,
    toMessageEvent,
    toRoomInfo,
} from "./mappers"
import { client, onClientEvent } from "./matrix-client"
import {
    DeleteMessageResult,
    Room,
    MatrixEvent,
} from "./types"
import {
    ROOM_MESSAGE_EVENT,
    ROOM_REDACTION_EVENT,
    LOGIN_BY_PASSWORD,
    LOGIN_BY_TOKEN,
} from "./constants"
import { checkIsDirect } from "./utils"

const RoomNotFound = createCustomError("RoomNotFound")
const TimelineWindowUndefined = createCustomError("TimelineWindowUndefined")
const PaginationFail = createCustomError("PaginationFail")
const EventNotFound = createCustomError("EventNotFound")
const ClientNotInitialized = createCustomError("ClientNotInitialized")

forward({
    from: loginByPasswordFx.done.map(() => ({ initialSyncLimit: 20 })),
    to: startClientFx,
})
loginByPasswordFx.use((params) => client().login(LOGIN_BY_PASSWORD, params))
loginByTokenFx.use((params) => client().login(LOGIN_BY_TOKEN, params))
initStoreFx.use(async () => {
    const { store } = client()
    if (store) return store.startup()
})
startClientFx.use((params) => client().startClient(params))
searchFx.use(async (params) => {
    const searchResponse = await client().search(params)
    return searchResponse
        .search_categories
        .room_events.results.map(({ result }) => {
            const event = new MatrixEvent(result)
            return toMessage(event)
        })
})
// TODO а нужен ли?
searchMessageTextFx.use((params) => client().searchMessageText(params))
sendMessageFx.use(({
    roomId,
    content,
    txnId
}) => client().sendMessage(roomId, content, txnId))
editMessageFx.use(({
    roomId, eventId, body, txnId,
}) => client().sendMessage(
    roomId,
    {
        "m.new_content": {
            msgtype: "m.text", body,
        },
        "m.relates_to": {
            rel_type: "m.replace",
            event_id: eventId,
        },
        "msgtype": "m.text",
        "body": "",
    },
    txnId,
))
deleteMessageFx.use(async ({
    roomId, eventId, reason,
}): Promise<DeleteMessageResult> => {
    const options = reason ? { reason } : undefined
    const res = await client().redactEvent(roomId, eventId, undefined, options)
    return {
        eventId: res.event_id,
    }
})
getRoomTimelineFx.use((roomId) => {
    const room = client().getRoom(roomId)
    if (room) {
        return room.timeline
            .filter((event) => [ROOM_MESSAGE_EVENT, ROOM_REDACTION_EVENT]
                .includes(event.getType()))
            .reduce(mergeMessageEvents, [])
    }
    return []
})
function getMappedRooms() {
    return client().getRooms().map(toMappedRoom)
}
onClientEvent([
    [
        "Room.timeline",
        (
            event: MatrixEvent,
            room: Room,
            toStartOfTimeline: boolean,
            removed,
            data
        ) => {
            const eventType = event.getType()
            if (eventType === ROOM_MESSAGE_EVENT
                || eventType === ROOM_REDACTION_EVENT
            ) {
                if (!toStartOfTimeline && data.liveEvent) {
                    roomMessage(toMessageEvent(event))
                }
            }
        }],
    ["sync", (state, prevState) => {
        if (state === "PREPARED") {
            const rooms = getMappedRooms()
            onCachedState(rooms)
            return
        }
        if (state === "SYNCING" && prevState === "PREPARED") {
            const rooms = getMappedRooms()
            onInitialSync(rooms)
            return
        }
        if (state === "SYNCING" && prevState === "SYNCING") {
            const rooms = getMappedRooms()
            onSync(rooms)
            return
        }
    }],
])
readAllMessagesFx.use(({ roomId, eventId }) => {
    const room = client().getRoom(roomId)
    if (!room) throw new RoomNotFound()
    const rrEvent = room.findEventById(eventId)
    if (!rrEvent) throw new EventNotFound()
    // Kludge - typings fix
    return client().setRoomReadMarkers(roomId, eventId, rrEvent as any)
})
getRoomsWithActivitiesFx.use((rooms) => {
    const cl = client()
    if (!cl) throw new ClientNotInitialized()
    const maxHistory = 99
    return rooms.map((room) => {
        const matrixRoom = cl.getRoom(room.roomId)
        if (!matrixRoom) throw new RoomNotFound()
        const events = matrixRoom.getLiveTimeline().getEvents()
        let unreadCount = 0
        for (let i = events.length - 1; i >= 0; i--) {
            if (i === events.length - maxHistory) break
            const event = events[i]
            const isReadUpTo = matrixRoom
                .hasUserReadEvent(cl.getUserId() as string, event.getId())
            if (isReadUpTo) {
                break
            }
            unreadCount += 1
        }
        const mergedMessageEvents = events
            .filter((event) => [ROOM_MESSAGE_EVENT, ROOM_REDACTION_EVENT]
                .includes(event.getType()))
            .reduce(mergeMessageEvents, [])
        const lastMessage = mergedMessageEvents.length ?
            mergedMessageEvents[mergedMessageEvents.length - 1] : undefined
        const isDirect = checkIsDirect(matrixRoom.roomId)
        const DMUser = isDirect
            ? client().getUser(matrixRoom.guessDMUserId())
            : null
        return {
            ...room,
            unreadCount,
            lastMessage,
            isDirect,
            isOnline: DMUser ? DMUser.currentlyActive : false,
            lastActivityTS: (matrixRoom as any).getLastActiveTimestamp()
        }
    })
})
stopClientFx.use(() => client().stopClient())
let timelineWindow: matrix.TimelineWindow | undefined
initTimelineWindowFx
    .use(async ({ roomId, initialEventId, initialWindowSize }) => {
        const cl = client()
        const room = client().getRoom(roomId)
        if (!room) throw new RoomNotFound()
        const timelineSet = room.getUnfilteredTimelineSet()
        timelineWindow = new matrix.TimelineWindow(cl, timelineSet)
        await timelineWindow.load(initialEventId, initialWindowSize)
        return timelineWindow
            .getEvents()
            .filter((event) => [ROOM_MESSAGE_EVENT, ROOM_REDACTION_EVENT]
                .includes(event.getType()))
            .reduce(mergeMessageEvents, [])
    })
loadTimelineWindowFx.use(async ({ initialEventId, initialWindowSize }) => {
    if (!timelineWindow) throw new TimelineWindowUndefined()
    await timelineWindow.load(initialEventId, initialWindowSize)
    return timelineWindow
        .getEvents()
        .filter((event) => [ROOM_MESSAGE_EVENT, ROOM_REDACTION_EVENT]
            .includes(event.getType()))
        .reduce(mergeMessageEvents, [])
})
getTimelineWindowMessagesFx.use(() => {
    if (!timelineWindow) return []
    return timelineWindow
        .getEvents()
        .filter((event) => [ROOM_MESSAGE_EVENT, ROOM_REDACTION_EVENT]
            .includes(event.getType()))
        .reduce(mergeMessageEvents, [])
})

paginateTimelineWindowFx.use(async ({
    direction,
    size,
    makeRequest,
    requestLimit,
}) => {
    if (!timelineWindow) throw new TimelineWindowUndefined()
    const dir = direction === "forward" ?
        matrix.EventTimeline.FORWARDS :
        matrix.EventTimeline.BACKWARDS
    const result: boolean = await timelineWindow
        .paginate(dir, size, makeRequest, requestLimit)
    if (!result) throw new PaginationFail()
    return timelineWindow.getEvents()
        .filter((event) => [ROOM_MESSAGE_EVENT, ROOM_REDACTION_EVENT]
            .includes(event.getType()))
        .reduce(mergeMessageEvents, [])
})

getRoomInfoFx.use((roomId) => {
    const room = client().getRoom(roomId)
    if (!room) throw new RoomNotFound()
    return toRoomInfo(room)
})
