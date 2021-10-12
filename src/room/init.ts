import matrix, { TimelineWindow } from "matrix-js-sdk"
import { debounce } from "patronum/debounce"
import { attach, forward, guard, sample } from "effector"
import { ROOM_MESSAGE_EVENT, ROOM_REDACTION_EVENT } from "@/constants"
import {
    mergeMessageEvents,
    toMappedRoomMember,
    toMessage,
    toRoomInfo
} from "@/mappers"
import { client } from "@/matrix-client"
import { MatrixEvent, RoomMember } from "@/types"
import { checkIsDirect, getMessages } from "@/utils"
import {
    $loadFilter,
    getRoomMembers,
    getRoomMembersFx,
    initRoomFx,
    loadRoomFx,
    onRoomMemberUpdate,
    onRoomUserUpdate
} from "./private"
import {
    $currentRoomId,
    $currentRoomMembers,
    $loadRoomFxPending,
    $timelineWindow,
    getRoomInfoFx,
    getRoomsWithActivitiesFx,
    initRoom,
    liveTimelineLoaded,
    loadRoom,
    loadRoomMessage,
    loadRoomMessageDone,
    onRoomInitialized,
    searchRoomMessagesFx,
    toLiveTimeline,
    loadInitialRoomDone
} from "./public"
import { LoadRoomFxParams } from "./types"
import {
    ClientNotInitialized,
    RoomNotFound,
    TimelineWindowUndefined,
    UserNotFound
} from "@/errors"

const toLiveTimelineFx = attach({ effect: loadRoomFx })
const loadRoomMessageFx = attach({ effect: loadRoomFx })
const loadInitialRoomFx = attach({ effect: loadRoomFx })

const getRoomMembersDebounced = debounce({
    source: getRoomMembers,
    timeout: 500
})

$currentRoomId.on(initRoom, (_, { roomId }) => roomId)
$timelineWindow
    .on(initRoomFx.doneData, (_, timelineWindow) => timelineWindow)
    .reset($currentRoomId)
$currentRoomMembers
    .on(getRoomMembersFx.doneData, (_, value) => value)
    .reset($currentRoomId)

forward({
    from: loadRoomFx.pending,
    to: $loadRoomFxPending,
})    
forward({
    from: initRoom,
    to: initRoomFx,
})
forward({
    from: toLiveTimelineFx.done,
    to: liveTimelineLoaded,
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
forward({
    from: loadRoomMessageFx.done,
    to: loadRoomMessageDone,
})
forward({
    from: loadInitialRoomFx.done,
    to: loadInitialRoomDone,
})

guard({
    source: $currentRoomId,
    filter: (roomId) => Boolean(roomId),
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
    clock: onRoomMemberUpdate,
    source: $currentRoomId,
    filter: (roomId, member) => roomId === member.roomId,
    target: getRoomMembers,
})
guard({
    source: $currentRoomId,
    clock: getRoomMembersDebounced,
    filter: Boolean,
    target: getRoomMembersFx
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
    target: loadInitialRoomFx
})
guard({
    source: sample(
        [$currentRoomId, $timelineWindow],
        loadRoomMessage,
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
            initialWindowSize,
            loadAdditionalDataDirection: "BACKWARD"
        })
    ),
    filter: $loadFilter,
    target: loadRoomMessageFx,
})
guard({
    source: sample(
        [$currentRoomId, $timelineWindow],
        toLiveTimeline,
        ([
            roomId,
            timelineWindow
        ]): LoadRoomFxParams => ({
            roomId: roomId as string,
            timelineWindow: timelineWindow as TimelineWindow,
            loadAdditionalDataDirection: "BACKWARD"
        })
    ),
    filter: $loadFilter,
    target: toLiveTimelineFx,
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
