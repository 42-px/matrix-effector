import matrix, { EventType, TimelineWindow, Room } from "matrix-js-sdk"
import { debounce } from "patronum/debounce"
import { attach, forward, guard, sample } from "effector"
import {
    toMappedRoom,
    toMappedRoomMember,
    toMappedUser,
    toMessage,
    toRoomInfo,
    toRoomWithActivity
} from "@/mappers"
import { client } from "@/matrix-client"
import { MatrixEvent, RoomMember } from "@/types"
import { getMessages } from "@/utils"
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
    createRoomFx, 
    getAllUsersFx, 
    inviteUserFx, 
    kickUserRoomFx,
    renameRoomFx,
    joinRoomFx,
    createDirectRoomFx,
} from "./public"
import { LoadRoomFxParams, Visibility } from "./types"
import {
    ClientNotInitialized,
    RoomNotFound,
    TimelineWindowUndefined,
    UserNotFound
} from "@/errors"

const toLiveTimelineFx = attach({ effect: loadRoomFx })
const loadRoomMessageFx = attach({ effect: loadRoomFx })

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
    target: loadRoomFx
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
    return rooms.map((room) => toRoomWithActivity(room, maxHistory))
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

getAllUsersFx.use(() => client().getUsers().map(toMappedUser))

createRoomFx.use(async ( {name, invite, visibility, initialState = [], preset} ) => {
    const options = {
        name, 
        invite,
        visibility,
        initial_state: initialState.map((state) => ({ 
            ...state,
            state_key: state.stateKey,
            stateKey: undefined,
        })),
        preset,
    }

    const { room_id } = await client().createRoom(options)

    return { roomId: room_id } 
})

createDirectRoomFx.use( async ({user, preset, initialState = []}) => {
    const cl = client()
    const roomsIds = (Object.values((cl.getAccountData('m.direct' as EventType) as MatrixEvent).getContent()) ?? []).flatMap((room) => room)
    const findRoomId = roomsIds.find((roomId) => (cl.getRoom(roomId) as Room).currentState.members[user.userId])
    if (findRoomId) return { roomId: findRoomId }
    
    const options = {
        is_direct: true, 
        invite: [user.userId],
        visibility: Visibility.private,
        initial_state: initialState.map((state) => ({ 
            ...state,
            state_key: state.stateKey,
            stateKey: undefined,
        })),
        preset,
    }
    const { room_id } = await cl.createRoom(options as any)

    const userId = (cl.getUserId() as string)
    await cl.setAccountData(('m.direct' as EventType), {
        [userId]: [...roomsIds, room_id],
    })

    return { roomId: "test" }
})

inviteUserFx.use( async ({userId, roomId}) => {
    await client().invite(roomId, userId)
})

kickUserRoomFx.use( async ({ roomId, userId, reason }) => {
    await client().kick(roomId, userId, reason)
})

renameRoomFx.use( async ({roomId, name}) => {
    await client().setRoomName(roomId, name)
})

joinRoomFx.use( async (roomId) => {
    const room = await client().joinRoom(roomId)
    return toRoomWithActivity(toMappedRoom(room), 99)
})