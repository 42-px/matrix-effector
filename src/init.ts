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
} from "./effects"
import { onCachedState, onInitialSync, roomMessage } from "./events"
import {
    mergeMessageEvents,
    toMappedRoom,
    toMessage,
    toMessageEvent,
} from "./mappers"
import { client, onClientEvent } from "./matrix-client"
import {
    DeleteMessageResult,
    Room,
    MatrixEvent,
} from "./types"

const RoomNotFound = createCustomError("RoomNotFound")
const TimelineWindowUndefined = createCustomError("TimelineWindowUndefined")
const PaginationFail = createCustomError("PaginationFail")

const ROOM_MESSAGE_EVENT = "m.room.message"
const ROOM_REDACTION_EVENT = "m.room.redaction"
const LOGIN_BY_PASSWORD = "m.login.password"
const LOGIN_BY_TOKEN = "m.login.token"

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
            const rooms = client().getRooms().map(toMappedRoom)
            onCachedState(rooms)
        }
        if (state === "SYNCING" && prevState === "PREPARED") {
            const rooms = client().getRooms().map(toMappedRoom)
            onInitialSync(rooms)
        }
    }],
])
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
