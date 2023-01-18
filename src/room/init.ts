import matrix, {
    Direction,
    EventType,
    MatrixEvent,
    Room,
    RoomMember,
    SearchOrderBy,
    TimelineWindow
} from "matrix-js-sdk"
import { debounce } from "patronum/debounce"
import {
    attach,
    forward,
    guard,
    sample
} from "effector"

import {
    getIsDirectRoomsIds,
    toMappedRoom,
    toMappedRoomMember,
    toMappedUser,
    toMessage,
    toRoomInfo,
    toRoomWithActivity
} from "@/mappers"
import { client } from "@/matrix-client"
import { DIRECT_EVENT } from "@/constants"
import { 
    CantInviteUsers,
    ClientNotInitialized,
    NotEnoughPermissions,
    RoomNotFound, 
    TimelineWindowUndefined,
    UserNotFound 
} from "@/errors"
import { getMessages, setDirectRoom } from "@/utils"
import { 
    roomMemberUpdated, 
    roomUserUpdated, 
    toggleTypingUser
} from "@/app"

import {
    initRoomFx,
    updatePowerLevelFx,
    updateRequiredPowerLevelForRoomFx,
} from "./private"
import {
    $currentRoom,
    $currentRoomId,
    $currentRoomMembers,
    $loadRoomFxPending,
    $myPowerLevel,
    $requiredPowerLevelForBan,
    $requiredPowerLevelForDefaultEvents,
    $requiredPowerLevelForDefaultState,
    $requiredPowerLevelForInvite,
    $requiredPowerLevelForKick,
    $requiredPowerLevelForRedact,
    $timelineWindow,
    clearCurrentRoomState,
    createDirectRoomFx,
    createRoomFx,
    DEFAULT_BAN_POWERLEVEL,
    DEFAULT_INVITE_POWERLEVEL,
    DEFAULT_KICK_POWERLEVEL,
    DEFAULT_REDACT_POWERLEVEL,
    DEFAULT_SEND_DEFAULT_EVENT_POWERLEVEL,
    DEFAULT_SET_DEFAULT_STATE_POWERLEVEL,
    getAllUsersFx,
    getRoomInfoFx,
    getRoomsWithActivitiesFx,
    initRoom,
    inviteUserFx,
    joinRoomFx,
    kickUserRoomFx,
    liveTimelineLoaded,
    loadRoom,
    loadRoomMessage,
    loadRoomMessageDone,
    onRoomInitialized,
    onRoomLoaded,
    renameRoomFx,
    searchRoomMessagesFx,
    toLiveTimeline,
    leaveRoomFx,
    $loadFilter,
    loadRoomFx,
    findDirectRoomByUserIdFx,
    $typingMembers,
    clearTypingMember,
    getRoomByIdFx,
    getRoomMembers,
    sendTypingFx,
    getMembersByRoomIdFx,
    inviteUsersFx,
    getRoomMemberFx,
    getPermissionsByRoomIdFx,
    getUserDevicesInfoFx,
} from "./public"
import {
    LoadRoomFxParams,
    Visibility
} from "./types"

const TYPING_SERVER_TIMEOUT = 5000

const toLiveTimelineFx = attach({ effect: loadRoomFx })
const loadRoomMessageFx = attach({ effect: loadRoomFx })
const loadInitialRoomFx = attach({ effect: loadRoomFx })

const getRoomMembersDebounced = debounce({
    source: getRoomMembers,
    timeout: 500
})

const getRoomMembersFx = attach({
    effect: getMembersByRoomIdFx
})

const getCurrentRoomFx = attach({
    effect: getRoomByIdFx
})
$typingMembers
    .on(toggleTypingUser, (members, member) => {
        if(member.typing) {
            if (members[member.roomId]) {
                return {
                    ...members,
                    [member.roomId]: [...members[member.roomId], member] 
                }
            } 
            return {
                ...members,
                [member.roomId]: [member] 
            }
        } 
        if (members[member.roomId]) {
            if (members[member.roomId].length > 1) {
                const filteredUsers = members[member.roomId]
                    .filter(({userId}) => userId !== member.userId)
                return {
                    ...members,
                    [member.roomId]: [...filteredUsers] 
                }
            }
            delete members[member.roomId]
            return {
                ...members, 
            }
        }
    })
    .reset(clearTypingMember)

$currentRoomId
    .on(initRoom, (_, { roomId }) => roomId)
    .reset(clearCurrentRoomState)
$currentRoom
    .on(getCurrentRoomFx.doneData, (_, room) => room)
    .reset(clearCurrentRoomState)
$timelineWindow
    .on(initRoomFx.doneData, (_, timelineWindow) => timelineWindow)
    .reset($currentRoomId)
$currentRoomMembers
    .on(getRoomMembersFx.doneData, (_, value) => value)
    .reset($currentRoomId)
$myPowerLevel
    .on(updatePowerLevelFx.doneData, (_, powerLevel) => powerLevel)
    .reset($currentRoomId)
$requiredPowerLevelForKick
    .on(updateRequiredPowerLevelForRoomFx.doneData,
        (_, powerLevels) => powerLevels.kick)
    .reset($currentRoomId)
$requiredPowerLevelForBan
    .on(updateRequiredPowerLevelForRoomFx.doneData,
        (_, powerLevels) => powerLevels.ban)
    .reset($currentRoomId)
$requiredPowerLevelForInvite
    .on(updateRequiredPowerLevelForRoomFx.doneData,
        (_, powerLevels) => powerLevels.invite)
    .reset($currentRoomId)
$requiredPowerLevelForDefaultEvents
    .on(updateRequiredPowerLevelForRoomFx.doneData,
        (_, powerLevels) => powerLevels.defaultEvents)
    .reset($currentRoomId)
$requiredPowerLevelForRedact
    .on(updateRequiredPowerLevelForRoomFx.doneData,
        (_, powerLevels) => powerLevels.redact)
    .reset($currentRoomId)
$requiredPowerLevelForDefaultState
    .on(updateRequiredPowerLevelForRoomFx.doneData,
        (_, powerLevels) => powerLevels.stateDefault)
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
    to: onRoomLoaded,
})

guard({
    clock: $currentRoomId,
    filter: Boolean,
    target: getCurrentRoomFx,
})    

guard({
    source: $currentRoomId,
    filter: (roomId) => Boolean(roomId),
    target: getRoomMembers,
})
guard({
    clock: roomUserUpdated,
    source: $currentRoomMembers,
    filter: (currentRoomMembers, user) => Boolean(
        currentRoomMembers?.find(((member) => 
            member.userId === user.userId
        ))),
    target: getRoomMembers,
})
guard({
    clock: roomMemberUpdated,
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
    source: sample({
        source: [$currentRoomId, $timelineWindow],
        clock: loadRoom,
        fn: ([
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
    
    }),
    filter: $loadFilter,
    target: loadInitialRoomFx
})
guard({
    source: sample({
        source: [$currentRoomId, $timelineWindow],
        clock: loadRoomMessage,
        fn: ([
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
    }),
    filter: $loadFilter,
    target: loadRoomMessageFx,
})
guard({
    source: sample({
        source: [$currentRoomId, $timelineWindow],
        clock: toLiveTimeline,
        fn: ([
            roomId,
            timelineWindow
        ]): LoadRoomFxParams => ({
            roomId: roomId as string,
            timelineWindow: timelineWindow as TimelineWindow,
            loadAdditionalDataDirection: "BACKWARD"
        })
    }),
    filter: $loadFilter,
    target: toLiveTimelineFx,
})

guard({
    clock: $currentRoomId,
    filter: Boolean,
    target: [updatePowerLevelFx, updateRequiredPowerLevelForRoomFx]
})

updatePowerLevelFx.use((roomId) => {
    const cl = client()
    const room = cl.getRoom(roomId) as Room
    const userId = cl.getUserId()
    if (!userId) throw new UserNotFound()
    const user = room.getMember(userId)
    if (!user) throw new UserNotFound()
    return user.powerLevel
})

updateRequiredPowerLevelForRoomFx.use((roomId) => {
    const cl = client()
    const room = cl.getRoom(roomId) as Room
    const powerLevelsContent  = room.currentState
        .getStateEvents("m.room.power_levels", "")
        .getContent()

    return {
        kick: powerLevelsContent.kick ?? DEFAULT_KICK_POWERLEVEL,
        ban: powerLevelsContent.ban ?? DEFAULT_BAN_POWERLEVEL,
        invite: powerLevelsContent.invite ?? DEFAULT_INVITE_POWERLEVEL,
        defaultEvents: powerLevelsContent.events_default ??
            DEFAULT_SEND_DEFAULT_EVENT_POWERLEVEL,
        stateDefault: powerLevelsContent.state_default ??
            DEFAULT_SET_DEFAULT_STATE_POWERLEVEL,
        redact: powerLevelsContent.redact ?? DEFAULT_REDACT_POWERLEVEL
    }
})

getMembersByRoomIdFx.use((roomId) => {
    const room = client().getRoom(roomId)
    if (!room) throw new RoomNotFound()
    return room.getMembers()
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
    // @TODO fix optional type
    await timelineWindow.load(initialEventId as string, initialWindowSize)
    const canPaginateForward = timelineWindow.canPaginate(Direction.Forward)
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
        canPaginateBackward: timelineWindow.canPaginate(Direction.Backward)
    }
})

getRoomsWithActivitiesFx.use((rooms) => {
    const cl = client()
    if (!cl) throw new ClientNotInitialized()
    return rooms.map((room) => toRoomWithActivity(room))
})

searchRoomMessagesFx
    .use(async ({ term, roomId, orderBy = SearchOrderBy.Rank }) => {
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
            // TODO: fix me
                const event = new MatrixEvent(result)
                const senderId = event.getSender()
                if (membersCache[senderId] === undefined) {
                    membersCache[senderId] = room
                        .getMember(senderId) as RoomMember
                }
                event.sender = membersCache[senderId]
                return toMessage(event)
            })
    })

getAllUsersFx.use(() => client().getUsers().map(toMappedUser))

createRoomFx.use(async ({
    name, 
    invite, 
    visibility, 
    initialState = [], 
    preset
}) => {
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

    // TODO: fix me
    const { room_id } = await client().createRoom(options as any)

    return { roomId: room_id } 
})

createDirectRoomFx.use( async ({user, preset, initialState = []}) => {
    const cl = client()
    const roomsIds = getIsDirectRoomsIds()
    const findRoomId = roomsIds.find(
        (roomId) => cl.getRoom(roomId)?.currentState.members[user.userId]
    )
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
        creation_content: {
            isDirect: true,
            creator: cl.getUserId() 
        }
    }
    const { room_id } = await cl.createRoom(options as any)
    await setDirectRoom(room_id, user.userId)

    return { roomId: room_id }
})

inviteUserFx.use( async ({userId, roomId}) => {
    const room = client().getRoom(roomId)
    if (!room) throw new RoomNotFound(`Room ${roomId} not found`)
    const isDirect = room.currentState
        .getStateEvents(
            EventType.RoomCreate,
            ""
        )?.getContent()?.isDirect
    if (isDirect) {
        throw new CantInviteUsers("Can't invite users into a direct room")
    }
    try {
        await client().invite(roomId, userId)
        await client().sendSharedHistoryKeys(roomId, [userId])
    } catch (e: any) {
        if (e.httpStatus === 403) {
            throw new NotEnoughPermissions(
                "Not enough permissions to invite users"
            )
        }
    }
})

inviteUsersFx.use( async ({usersIds, roomId}) => {
    const room = client().getRoom(roomId)
    if (!room) throw new RoomNotFound(`Room ${roomId} not found`)
    const isDirect = room.currentState
        .getStateEvents(
            EventType.RoomCreate,
            ""
        )?.getContent()?.isDirect
    if (isDirect) {
        throw new CantInviteUsers("Can't invite users into a direct room")
    }
    for (const id of usersIds) {
        try {
            await client().invite(roomId, id)
            await client().sendSharedHistoryKeys(roomId, [id])
        } catch (e: any) {
            if (e.httpStatus === 403) {
                throw new NotEnoughPermissions()
            }
        }
    }
})

kickUserRoomFx.use( async ({ roomId, userId, reason }) => {
    await client().kick(roomId, userId, reason)
})

renameRoomFx.use( async ({roomId, name}) => {
    await client().setRoomName(roomId, name)
})

joinRoomFx.use( async ({roomId, isDirect = false}) => {
    const cl = client()
    const room = await cl.joinRoom(roomId)
    if (isDirect) {
        await setDirectRoom(roomId)
    }
    if (cl.isRoomEncrypted(roomId)) {
        await cl.setRoomEncryption(
            cl.getUserId(),
            { algorithm: "m.megolm.v1.aes-sha2" }
        )
        const members = (
            await room.getEncryptionTargetMembers()
        ).map((x: RoomMember) => x.userId)
        await cl.downloadKeys(members, true)
        await cl.downloadKeysForUsers(members, {})
    }
    return toRoomWithActivity(toMappedRoom(room))
})

getRoomByIdFx.use((roomId) => {
    const matrixRoom = client().getRoom(roomId)
    if (!matrixRoom) return null
    return toRoomWithActivity(toMappedRoom(matrixRoom))
})

leaveRoomFx.use( async (roomId) => {
    await client().leave(roomId)
})

findDirectRoomByUserIdFx.use((userId) => {
    const cl = client()
    const directRooms = cl.getAccountData(DIRECT_EVENT)?.getContent()
    const roomId = directRooms[userId] && directRooms[userId][0]
    if(!roomId) throw new RoomNotFound()
    const room = cl.getRoom(roomId)
    if(!room) throw new RoomNotFound()
    return toMappedRoom(room)
})

sendTypingFx.use(async ({ roomId, isTyping }) => {
    await client().sendTyping(roomId, isTyping, TYPING_SERVER_TIMEOUT)
})

getRoomMemberFx.use(({ roomId, userId }) => {
    const matrixRoom = client().getRoom(roomId)
    if (!matrixRoom) throw new RoomNotFound(`${roomId} room not found`)
    const roomMember = matrixRoom?.getMember(userId)
    if (!roomMember) throw new UserNotFound(`${userId} room member not found`)
    return roomMember
})

getPermissionsByRoomIdFx.use(async (roomId) => {
    const cl = client()
    const room = cl.getRoom(roomId)
    if (!room) throw new RoomNotFound(`Room ${roomId} not found`)
    const userId = cl.getUserId()
    const user = room.getMember(userId)
    if (!user) throw new UserNotFound(`User ${userId} not found`)
    const { powerLevel } = user 
    const {
        kick,
        ban,
        invite,
        events_default,
        state_default,
        redact
    } = room.currentState
        .getStateEvents("m.room.power_levels", "")
        .getContent()

    return {
        canKick: powerLevel >= kick,
        canBan: powerLevel >= ban,
        canInvite: powerLevel >= invite,
        canSendDefaultEvent: powerLevel >= events_default,
        canSetDefaultState: powerLevel >= state_default,
        canRedact: powerLevel >= redact
    }
})

getUserDevicesInfoFx.use(async (userId) => {
    const cl = client()
    const isMe = cl.getUserId() === userId
    return cl.getStoredDevicesForUser(userId).map((device) => {
        const deviceTrust = cl.checkDeviceTrust(userId, device.deviceId) 
        const verified = isMe 
            ? deviceTrust.isCrossSigningVerified() 
            : deviceTrust.isVerified()
        return {
            deviceId: device.deviceId,
            displayName: device.getDisplayName(),
            verified,
        }
    })

})
