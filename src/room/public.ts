import {
    TimelineWindow,
    Room,
    User,
    RoomMember
} from "matrix-js-sdk"
import { combine } from "effector"
import {
    MappedRoom,
    MappedUser,
    Message,
    RoomInfo,
    RoomWithActivity,
    SearchRoomMessagesPayload
} from "@/types"
import { roomDomain } from "./domain"
import {
    GoToMessageParams,
    InitRoomParams,
    LoadRoomParams,
    MappedRoomMember,
    CreateRoomParams,
    InviteUserParams, 
    KickUserParams, 
    RenameRoomParams,
    CreateDirectRoomParams,
    LoadRoomFxParams,
    MessageResponse
} from "./types"

export const DEFAULT_INVITE_POWERLEVEL = 50
export const DEFAULT_BAN_POWERLEVEL = 50
export const DEFAULT_KICK_POWERLEVEL = 50
export const DEFAULT_SEND_DEFAULT_EVENT_POWERLEVEL = 0
export const DEFAULT_SET_DEFAULT_STATE_POWERLEVEL = 50
export const DEFAULT_REDACT_POWERLEVEL = 50

export const $isLive = roomDomain.store<boolean | null>(null)
export const $loadRoomFxPending = roomDomain.store<boolean>(false)
export const $currentRoomMembers = roomDomain
    .store<MappedRoomMember[] | null>(null)
export const $currentRoomId = roomDomain
    .store<RoomWithActivity["roomId"] | null>(null)
export const $currentRoom = roomDomain.store<RoomWithActivity | null>(null)
export const clearCurrentRoomState = roomDomain.event()
export const $timelineWindow = roomDomain.store<TimelineWindow | null>(null)
export const $myPowerLevel = roomDomain.store<number>(0)

export const $requiredPowerLevelForKick = roomDomain
    .store<number>(DEFAULT_KICK_POWERLEVEL)
export const $requiredPowerLevelForInvite = roomDomain
    .store<number>(DEFAULT_INVITE_POWERLEVEL)
export const $requiredPowerLevelForBan = roomDomain
    .store<number>(DEFAULT_BAN_POWERLEVEL)
export const $requiredPowerLevelForDefaultEvents = roomDomain
    .store<number>(DEFAULT_SEND_DEFAULT_EVENT_POWERLEVEL)
export const $requiredPowerLevelForRedact = roomDomain
    .store<number>(DEFAULT_REDACT_POWERLEVEL)
export const $requiredPowerLevelForDefaultState = roomDomain
    .store<number>(DEFAULT_SET_DEFAULT_STATE_POWERLEVEL)

export const $currentJoinedRoomMembers = $currentRoomMembers
    .map(
        (members) => members?.filter(
            (member) => member.membership === "join") ?? []
    )

export const $canKick = combine(
    $myPowerLevel, $requiredPowerLevelForKick,
    (m, r) => m >= r
)
export const $canInvite = combine(
    $myPowerLevel, $requiredPowerLevelForInvite,
    (m, r) => m >= r
)
export const $canBan = combine(
    $myPowerLevel, $requiredPowerLevelForBan,
    (m, r) => m >= r
)
export const $canSendDefaultEvent = combine(
    $myPowerLevel, $requiredPowerLevelForDefaultEvents,
    (m, r) => m >= r
)
export const $canRedact = combine(
    $myPowerLevel, $requiredPowerLevelForRedact,
    (m, r) => m >= r
)
export const $canSetDefaultState = combine(
    $myPowerLevel, $requiredPowerLevelForDefaultState,
    (m, r) => m >= r
)

export const $loadFilter = combine(
    $currentRoomId,
    $timelineWindow,
    (roomId, timelineWindow) => Boolean(roomId) && Boolean(timelineWindow)
)

export const onRoomUserUpdate = roomDomain.event<User>()
export const onRoomMemberUpdate = roomDomain.event<RoomMember>()
export const getRoomMembers = roomDomain.event<void>()
export const initRoom = roomDomain.event<InitRoomParams>()
export const liveTimelineLoaded = roomDomain.event<void>()
export const onRoomInitialized = roomDomain.event<void>()
export const loadRoomMessageDone = roomDomain.event<void>()
export const onRoomLoaded = roomDomain.event<void>()
export const loadRoom = roomDomain.event<LoadRoomParams>()
export const toLiveTimeline = roomDomain.event<void>()
export const loadRoomMessage = roomDomain.event<GoToMessageParams>()
export const directRoomCreated = roomDomain.event<Room>()
export const roomCreated = roomDomain.event<Room>()

export const findDirectRoomByUserIdFx = roomDomain
    .effect<string, MappedRoom, Error>()
export const searchRoomMessagesFx = roomDomain
    .effect<SearchRoomMessagesPayload, Message[], Error>()
export const getRoomsWithActivitiesFx = roomDomain
    .effect<MappedRoom[], RoomWithActivity[], Error>()
export const getRoomInfoFx = roomDomain
    .effect<string, RoomInfo, Error>()
export const getAllUsersFx = roomDomain
    .effect<void, MappedUser[], Error>()
export const createRoomFx = roomDomain
    .effect<CreateRoomParams, { roomId: string }, Error>()
export const createDirectRoomFx = roomDomain
    .effect<CreateDirectRoomParams, { roomId: string }, Error>()
export const inviteUserFx = roomDomain.effect<InviteUserParams, void, Error>()
export const kickUserRoomFx = roomDomain.effect<KickUserParams, void, Error>()
export const renameRoomFx = roomDomain.effect<RenameRoomParams, void, Error>()
export const joinRoomFx = roomDomain
    .effect<{roomId: string; isDirect?: boolean}, RoomWithActivity, Error>()
export const leaveRoomFx = roomDomain
    .effect<string, void, Error>()
export const loadRoomFx = roomDomain
    .effect<LoadRoomFxParams, MessageResponse, Error>()
