import { createCustomError } from "@42px/custom-errors"
import { attach, forward, guard, sample } from "effector"
import matrix, { RoomMember, TimelineWindow } from "matrix-js-sdk"
import {
    initStoreFx,
    loginByPasswordFx,
    deleteMessageFx,
    sendMessageFx,
    startClientFx,
    editMessageFx,
    loginByTokenFx,
    stopClientFx,
    searchRoomMessagesFx,
    readAllMessagesFx,
    getRoomsWithActivitiesFx,
    getRoomInfoFx,
    getLoggedUserFx,
    initRoomFx,
    initRoom,
    loadRoom,
    onCachedState,
    onInitialSync,
    onSync,
    paginateBackward,
    paginateForward,
    roomMessage,
    $canLoad,
    $canPaginate,
    $currentRoomId,
    $eventsRetrieved,
    $isLive,
    $messages,
    $paginateBackwardPending,
    $paginateForwardPending,
    $timelineWindow,
    $loadRoomFxPending
} from "./public"
import { paginateRoomFx, loadRoomFx } from "./private"
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
    LoadRoomFxParams,
    PaginateParams,
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
const EventNotFound = createCustomError("EventNotFound")
const ClientNotInitialized = createCustomError("ClientNotInitialized")

const paginateBackwardFx = attach({
    source: [$currentRoomId, $timelineWindow],
    effect: paginateRoomFx,
    mapParams: (params: PaginateParams, [roomId, timelineWindow]) => ({
        roomId: roomId as string,
        timelineWindow: timelineWindow as TimelineWindow,
        direction: "backward" as const,
        ...params,
    })
})

const paginateForwardFx = attach({
    source: [$currentRoomId, $timelineWindow],
    effect: paginateRoomFx,
    mapParams: (params: PaginateParams, [roomId, timelineWindow]) => ({
        roomId: roomId as string,
        timelineWindow: timelineWindow as TimelineWindow,
        direction: "forward" as const,
        ...params,
    })
})
const onRoomReset = $currentRoomId.updates
    .filterMap(id => id === null ? true : undefined)

$currentRoomId.on(initRoom, (_, { roomId }) => roomId)
$timelineWindow
    .on(initRoomFx.doneData, (_, timelineWindow) => timelineWindow)
    .reset($currentRoomId.updates)
// Race ellimination
const setMessages = guard({
    source: sample(
        $currentRoomId,
        [loadRoomFx.done, paginateRoomFx.done],
        (
            currentRoomId,
            { 
                params: { roomId },
                result: { messages, isLive, eventsRetrieved }
            }) => ({
            currentRoomId,
            roomId,
            messages,
            isLive,
            eventsRetrieved,
        })
    ),
    filter: ({ currentRoomId, roomId }) => currentRoomId === roomId
})
$messages
    .on(setMessages, (_, { messages }) => messages)
    .reset($currentRoomId.updates)
$isLive
    .on(setMessages, (_, { isLive }) => isLive)
    .reset(onRoomReset)
$eventsRetrieved
    .on(setMessages, (_, { isLive }) => isLive)
    .reset(onRoomReset)
forward({
    from: loadRoomFx.pending,
    to: $loadRoomFxPending,
})
forward({
    from: paginateForwardFx.pending,
    to: $paginateForwardPending,
})
forward({
    from: paginateBackwardFx.pending,
    to: $paginateBackwardPending,
})

guard({
    source: sample(
        [$currentRoomId, $timelineWindow],
        loadRoom,
        ([
            roomId,
            timelineWindow
        ], {
            initialEventId,
            initialWindowSize,
        }): LoadRoomFxParams => ({
            roomId: roomId as string,
            timelineWindow: timelineWindow as TimelineWindow,
            initialEventId,
            initialWindowSize
        })
    ),
    filter: $canLoad,
    target: loadRoomFx
})
guard({
    source: paginateBackward,
    filter: $canPaginate,
    target: paginateBackwardFx
})
guard({
    source: paginateForward,
    filter: $canPaginate,
    target: paginateForwardFx
})

getLoggedUserFx.use(() => {
    const cl = client()
    if (!cl) return null
    const loggedUserId = cl.getUserId()
    if (!loggedUserId) return null
    const user = cl.getUser(loggedUserId)
    if (!user) return null
    return {
        userId: user.userId,
        currentlyActive: user.currentlyActive,
        displayName: user.displayName,
        lastActiveAgo: user.lastActiveAgo,
        lastPresenceTs: user.lastPresenceTs,
        presence: user.presence
    }
})
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
searchRoomMessagesFx.use(async ({ term, roomId }) => {
    const room = client().getRoom(roomId)
    if (!room) throw new RoomNotFound()
    const membersCache: { [id: string]: RoomMember } = {}
    const searchResponse = await client().search({
        body: {
            search_categories: {
                room_events: {
                    search_term: term,
                    keys: ["content.body"],
                    filter: {
                        rooms: [roomId],
                    },
                },
            },
        },
    })
    return searchResponse
        .search_categories
        .room_events.results.map(({ result }) => {
            const event = new MatrixEvent(result)
            const senderId = event.getSender()
            if (membersCache[senderId] === undefined) {
                membersCache[senderId] = room.getMember(senderId)
            }
            event.sender = membersCache[senderId]
            return toMessage(event)
        })
})
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
            ? matrixRoom.getMember(matrixRoom.guessDMUserId())
            : null

        return {
            ...room,
            unreadCount,
            lastMessage,
            isDirect,
            directUserId: DMUser?.userId,
            // ToDo: Разобраться, почему у для некоторых юзеров не прилетает объект user в DMUSER
            // Гипотеза 1: Шифрованные чаты как-то с этим могут быть связаны
            isOnline: DMUser
                ? Boolean(DMUser.user?.currentlyActive)
                : undefined,
            lastActivityTS: (matrixRoom as any).getLastActiveTimestamp()
        }
    })
})
stopClientFx.use(() => client().stopClient())
loadRoomFx.use(async ({
    timelineWindow,
    initialEventId,
    initialWindowSize
}) => {
    if (!timelineWindow) throw new TimelineWindowUndefined()
    await timelineWindow.load(initialEventId, initialWindowSize)
    const isLive = !timelineWindow.canPaginate("f")
    let messages = timelineWindow
        .getEvents()
        .filter((event) => [ROOM_MESSAGE_EVENT, ROOM_REDACTION_EVENT]
            .includes(event.getType()))
        .reduce(mergeMessageEvents, [])
    // дозагрузка сообщений если пришло меньше чем ожидали
    if (initialWindowSize && messages.length < initialWindowSize) {
        const size = messages.length - initialWindowSize
        const eventsRetrieved: boolean = await timelineWindow
            .paginate(matrix.EventTimeline.BACKWARDS, size)
        if (eventsRetrieved) {
            messages = timelineWindow
                .getEvents()
                .filter((event) => [ROOM_MESSAGE_EVENT, ROOM_REDACTION_EVENT]
                    .includes(event.getType()))
                .reduce(mergeMessageEvents, [])
        }
    }
    return {
        messages,
        isLive,
        eventsRetrieved: true
    }
})

paginateRoomFx.use(async ({
    timelineWindow,
    direction,
    size,
    makeRequest,
    requestLimit,
}) => {
    if (!timelineWindow) throw new TimelineWindowUndefined()
    const dir = direction === "forward" ?
        matrix.EventTimeline.FORWARDS :
        matrix.EventTimeline.BACKWARDS
    const eventsRetrieved: boolean = await timelineWindow
        .paginate(dir, size, makeRequest, requestLimit)
    const isLive = !timelineWindow.canPaginate("f")
    const messages =  timelineWindow.getEvents()
        .filter((event) => [ROOM_MESSAGE_EVENT, ROOM_REDACTION_EVENT]
            .includes(event.getType()))
        .reduce(mergeMessageEvents, [])
    return {
        messages,
        isLive,
        eventsRetrieved
    }
})

getRoomInfoFx.use((roomId) => {
    const room = client().getRoom(roomId)
    if (!room) throw new RoomNotFound()
    return toRoomInfo(room)
})

initRoomFx.use(async ({ roomId }) => {
    const cl = client()
    const room = client().getRoom(roomId)
    if (!room) throw new RoomNotFound()
    const timelineSet = room.getUnfilteredTimelineSet()
    return new matrix.TimelineWindow(cl, timelineSet)
})
