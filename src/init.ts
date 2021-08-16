import { createCustomError } from "@42px/custom-errors"
import { attach, combine, forward, guard, sample } from "effector"
import matrix, {
    RoomMember,
    TimelineWindow,
    EventStatus,
    User,
} from "matrix-js-sdk"
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
    initRoom,
    loadRoom,
    onCachedState,
    onInitialSync,
    onSync,
    paginateBackward,
    paginateForward,
    roomMessage,
    $currentRoomId,
    $isLive,
    $messages,
    $paginateBackwardPending,
    $paginateForwardPending,
    $timelineWindow,
    $loadRoomFxPending,
    $canPaginateBackward,
    $canPaginateForward,
    onRoomInitialized,
    checkEventPermissionsFx,
    uploadContentFx,
    onUploadProgress,
    $currentRoomMembers,
    getUrlPreviewFx,
    getNotificationRulesFx,
    setNotificationRuleEnabledFx,
    setNotificationRuleActionFx,
    deleteNotificationRuleFx,
} from "./public"
import {
    paginateRoomFx,
    loadRoomFx,
    initRoomFx,
    updateMessagesFx,
    updateMessages,
    getRoomMembers,
    getRoomMembersFx,
    onRoomMemberUpdate,
    onRoomUserUpdate
} from "./private"
import {
    mergeMessageEvents,
    toMappedRoom,
    toMappedRoomMember,
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
    UploadContentResult,
    NotificationRulesResult,
    SetNotificationsRuleParams,
} from "./types"
import {
    ROOM_MESSAGE_EVENT,
    ROOM_REDACTION_EVENT,
    LOGIN_BY_PASSWORD,
    LOGIN_BY_TOKEN,
} from "./constants"
import { checkIsDirect } from "./utils"
import { debounce } from "patronum"

const RoomNotFound = createCustomError("RoomNotFound")
const UserNotFound = createCustomError("UserNotFound")
const TimelineWindowUndefined = createCustomError("TimelineWindowUndefined")
const EventNotFound = createCustomError("EventNotFound")
const ClientNotInitialized = createCustomError("ClientNotInitialized")
const UserNotLoggedIn = createCustomError("UserNotLoggedIn")

function getMessages(timelineWindow: TimelineWindow) {
    return timelineWindow
        .getEvents()
        .filter((event) => [ROOM_MESSAGE_EVENT, ROOM_REDACTION_EVENT]
            .includes(event.getType()))
        .reduce(mergeMessageEvents, [])
}

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

const $loadFilter = combine(
    $currentRoomId,
    $timelineWindow,
    (roomId, timelineWindow) => Boolean(roomId) && Boolean(timelineWindow)
)
const $paginateFilter = combine(
    $loadFilter,
    $paginateBackwardPending,
    $paginateForwardPending,
    $loadRoomFxPending,
    (
        canLoad,
        backwardPaginationPending,
        forwardPaginationPending,
        roomLoading,
    ) => canLoad
      && !backwardPaginationPending
      && !forwardPaginationPending
      && !roomLoading
)

$currentRoomId.on(initRoom, (_, { roomId }) => roomId)
$timelineWindow
    .on(initRoomFx.doneData, (_, timelineWindow) => timelineWindow)
    .reset($currentRoomId)
// Race ellimination
const setMessages = guard({
    source: sample(
        $currentRoomId,
        [loadRoomFx.done, paginateRoomFx.done, updateMessagesFx.done],
        (
            currentRoomId,
            { 
                params: { roomId },
                result,
            }) => ({
            currentRoomId,
            roomId,
            ...result,
        })
    ),
    filter: ({ currentRoomId, roomId }) => currentRoomId === roomId
})
$messages
    .on(setMessages, (_, { messages }) => messages)
    .reset($currentRoomId)
$isLive
    .on(setMessages, (_, { isLive }) => isLive)
    .reset($currentRoomId)
$currentRoomMembers
    .on(getRoomMembersFx.doneData, (_, value) => value)
    .reset($currentRoomId)
$canPaginateBackward
    .on(setMessages, (_, { canPaginateBackward }) => canPaginateBackward)
    .reset([loadRoom, $currentRoomId])
$canPaginateForward
    .on(setMessages, (_, { canPaginateForward }) => canPaginateForward)
    .reset([loadRoom, $currentRoomId])

guard({
    source: $currentRoomId,
    filter: (roomId) => Boolean(roomId),
    target: getRoomMembers,
})

const getRoomMembersDebounced = debounce({
    source: getRoomMembers,
    timeout: 500
})
guard({
    clock: onRoomMemberUpdate,
    source: $currentRoomId,
    filter: (roomId, member) => roomId === member.roomId,
    target: getRoomMembers,
})

guard({
    clock: onRoomUserUpdate,
    source: $currentRoomMembers,
    filter: (currentRoomMembers, user) => Boolean(
        currentRoomMembers?.find(((member) => 
            member.userId === user.userId
        ))),
    target: getRoomMembers,
})

guard({
    source: $currentRoomId,
    clock: getRoomMembersDebounced,
    filter: Boolean,
    target: getRoomMembersFx
})

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
forward({
    from: sample({
        source: $timelineWindow,
        clock: initRoomFx.done,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        fn: () => {},
    }),
    to: onRoomInitialized,
})
guard({
    source: sample(
        [$currentRoomId, $timelineWindow],
        updateMessages,
        ([roomId, timelineWindow]) => ({
            timelineWindow: timelineWindow as TimelineWindow,
            roomId: roomId as string
        })
    ),
    filter: $timelineWindow.map(timelineWindow => Boolean(timelineWindow)),
    target: updateMessagesFx,
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
            loadAdditionalDataDirection = "BACKWARD"
        }): LoadRoomFxParams => ({
            roomId: roomId as string,
            timelineWindow: timelineWindow as TimelineWindow,
            initialEventId,
            initialWindowSize,
            loadAdditionalDataDirection
        })
    ),
    filter: $loadFilter,
    target: loadRoomFx
})
guard({
    source: paginateBackward,
    filter: $paginateFilter,
    target: paginateBackwardFx
})
guard({
    source: paginateForward,
    filter: $paginateFilter,
    target: paginateForwardFx
})
forward({
    from: initRoom,
    to: initRoomFx,
})
getLoggedUserFx.use(async () => {
    const cl = client()
    if (!cl) return null
    const loggedUserId = cl.getUserId()
    if (!loggedUserId) return null
    const user = cl.getUser(loggedUserId)
    if (!user) return null
    // FixMe: Необъяснимое поведение получения юзера через getUser
    // Аватар и дисплейнейм не приходят, и приходится получать 
    let avatarUrl = user.avatarUrl
    let displayName = user.displayName
    if (!user?.avatarUrl || !user?.displayName) {
        const profileInfo = await cl.getProfileInfo(loggedUserId)
        avatarUrl = profileInfo.avatar_url as string
        displayName = profileInfo.displayname as string
    }
    return {
        avatarUrl,
        userId: user.userId,
        currentlyActive: user.currentlyActive,
        displayName,
        lastActiveAgo: user.lastActiveAgo,
        lastPresenceTs: user.lastPresenceTs,
        presence: user.presence as any
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
searchRoomMessagesFx.use(async ({ term, roomId, orderBy = "rank" }) => {
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
                    order_by: orderBy,
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
    ["Room.localEchoUpdated", () => updateMessages()],
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
    [
        "RoomState.members",
        (e, state, member: RoomMember) => onRoomMemberUpdate(member)
    ],
    [
        "RoomState.newMember",
        (e, state, member: RoomMember) => onRoomMemberUpdate(member)
    ],
    [
        "RoomMember.membership",
        (e, member: RoomMember) => onRoomMemberUpdate(member)
    ],
    [
        "RoomMember.name",
        (e, member: RoomMember) => onRoomMemberUpdate(member)
    ],
    [
        "RoomMember.powerLevel",
        (e, member: RoomMember) => onRoomMemberUpdate(member)
    ],
    [
        "RoomMember.typing",
        (e, member: RoomMember) => onRoomMemberUpdate(member)
    ],
    [
        "User.avatarUrl",
        (e, user: User) => onRoomUserUpdate(user)
    ],
    [
        "User.presence",
        (e, user: User) => onRoomUserUpdate(user)
    ],
    [
        "User.displayName",
        (e, user: User) => onRoomUserUpdate(user)
    ],
    
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
    initialWindowSize,
    loadAdditionalDataDirection
}) => {
    if (!timelineWindow) throw new TimelineWindowUndefined()
    await timelineWindow.load(initialEventId, initialWindowSize)
    const canPaginateForward = timelineWindow.canPaginate("f")
    let messages = getMessages(timelineWindow)
    // дозагрузка сообщений если пришло меньше чем ожидали
    if (initialWindowSize && messages.length < initialWindowSize) {
        let eventsRetrieved: boolean
        const size = initialWindowSize - messages.length
        if (loadAdditionalDataDirection === "BACKWARD") {
            eventsRetrieved = await timelineWindow
                .paginate(matrix.EventTimeline.BACKWARDS, size)
        } else {
            eventsRetrieved = await timelineWindow
                .paginate(matrix.EventTimeline.FORWARDS, size)
        }
        if (eventsRetrieved) {
            messages = getMessages(timelineWindow)
        }
    }
    return {
        messages,
        isLive: !canPaginateForward,
        canPaginateForward,
        canPaginateBackward: timelineWindow.canPaginate("b")
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
    await timelineWindow
        .paginate(dir, size, makeRequest, requestLimit)
    const canPaginateForward = timelineWindow.canPaginate("f")
    const messages = getMessages(timelineWindow)
    return {
        messages,
        isLive: !canPaginateForward,
        canPaginateForward: canPaginateForward,
        canPaginateBackward: timelineWindow.canPaginate("b")
    }
})
updateMessagesFx.use(({ timelineWindow }) => {
    const canPaginateForward = timelineWindow.canPaginate("f")
    return {
        messages: getMessages(timelineWindow),
        isLive: !canPaginateForward,
        canPaginateForward: canPaginateForward,
        canPaginateBackward: timelineWindow.canPaginate("b")
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
function canEditContent(mxEvent: MatrixEvent): boolean {
    if (mxEvent.status === EventStatus.CANCELLED ||
        mxEvent.getType() !== "m.room.message" ||
        mxEvent.isRedacted()
    ) {
        return false
    }
    const content = mxEvent.getOriginalContent()
    const {msgtype} = content
    return (msgtype === "m.text" || msgtype === "m.emote") &&
        Boolean(content.body) && typeof content.body === "string" &&
        mxEvent.getSender() === client().getUserId()
}
checkEventPermissionsFx.use(({ eventId, roomId }) => {
    const cl = client()
    if (!cl) throw new ClientNotInitialized()
    const room = cl.getRoom(roomId)
    if (!room) throw new RoomNotFound()
    const mxEvent = room.findEventById(eventId)
    if (!mxEvent) throw new EventNotFound()
    const userId = cl.getUserId()
    if (!userId) throw new UserNotLoggedIn()
    const canRedact = room.currentState
        .maySendRedactionForEvent(mxEvent, userId) &&
            mxEvent.getType() as string !==
                "m.room.server_acl"   // missing in DT types
    const canEdit = canEditContent(mxEvent)
    return {
        canRedact,
        canEdit,
    }
})

uploadContentFx.use(({
    file,
    name,
    includeFilename,
    onlyContentUri,
    rawResponse,
    type,
}) => {
    const cl = client()
    const promise = cl.uploadContent(file, {
        name,
        includeFilename,
        type,
        onlyContentUri,
        rawResponse,
        progressHandler: ({ loaded, total }: {
            loaded: number
            total: number
        }) => {
            // warning: loosing event scope
            onUploadProgress({ file, loaded, total }) 
        },
    } as any) as any
    const result: UploadContentResult = { promise }
    if (promise.abort) result.abort = promise.abort
    return result
})

getRoomMembersFx.use((roomId) => {
    const room = client().getRoom(roomId)
    if (!room) throw new RoomNotFound()
    return Object.values(room.currentState.members)
        .map((member) => {
            const user = client().getUser(member.userId)
            if (!user) throw new UserNotFound()
            return toMappedRoomMember(member, user)
        })
})

getUrlPreviewFx.use(({url, ts, timeout = 5000}) => {
    return new Promise((resolve)=>{
        client().getUrlPreview(url, ts)
            .then(resolve)
            .catch(()=> resolve({"og:url": url}))
        setTimeout(()=>{
            resolve({"og:url": url})
        }, timeout)
    })
})

getNotificationRulesFx.use(() => {
    return client().getPushRules() as Promise<NotificationRulesResult>
})

setNotificationRuleActionFx.use(async (payload: SetNotificationsRuleParams) => {
    try {
        await client().setPushRuleActions(
            payload.scope, 
            payload.kind, 
            payload.ruleId, 
            // FixMe: Если в будущем в matrix-js-sdk пофиксят
            // типы - убрать as any
            payload.actions as any
        )
    } catch (err) {
        console.error('Error while setNotificationRuleAction.Fx')
        console.error(err)
        throw err
    }
})

setNotificationRuleEnabledFx.use(async (payload) => {
    try {
        console.error('Getting push rules...')
        const rules = await client().getPushRules() as any
        console.error(rules.global.room)
        await client().setPushRuleEnabled(
            payload.scope,
            payload.kind,
            payload.ruleId,
            payload.enabled
        )
    } catch (err) {
        console.error('Error while setNotificationRuleEnabled')
        console.error(err)
    }
})

deleteNotificationRuleFx.use(async(payload) => {
    await client().deletePushRule(
        payload.scope,
        payload.kind,
        payload.ruleId
    )
})