import { TimelineWindow, User, Room } from "matrix-js-sdk"
import {
    MappedRoom,
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
    RenameRoomParams
} from "./types"

export const $isLive = roomDomain.store<boolean | null>(null)
export const $loadRoomFxPending = roomDomain.store<boolean>(false)
export const $currentRoomMembers = roomDomain
    .store<MappedRoomMember[] | null>(null)
export const $currentRoomId = roomDomain
    .store<RoomWithActivity["roomId"] | null>(null)
export const $timelineWindow = roomDomain.store<TimelineWindow | null>(null)

export const initRoom = roomDomain.event<InitRoomParams>()
export const liveTimelineLoaded = roomDomain.event<void>()
export const onRoomInitialized = roomDomain.event<void>()
export const loadRoomMessageDone = roomDomain.event<void>()
export const loadRoom = roomDomain.event<LoadRoomParams>()
export const toLiveTimeline = roomDomain.event<void>()
export const loadRoomMessage = roomDomain.event<GoToMessageParams>()

export const searchRoomMessagesFx = roomDomain
    .effect<SearchRoomMessagesPayload, Message[], Error>()
export const getRoomsWithActivitiesFx = roomDomain
    .effect<MappedRoom[], RoomWithActivity[], Error>()
export const getRoomInfoFx = roomDomain
    .effect<string, RoomInfo, Error>()
export const getAllUsersFx = roomDomain
    .effect<void, User[], Error>()
export const createRoomFx = roomDomain.effect<CreateRoomParams, string, Error>()
export const inviteUserFx = roomDomain.effect<InviteUserParams, Promise<void>, Error>()
export const kickUserRoomFx = roomDomain.effect<KickUserParams, Promise<void>, Error>()
export const renameRoomFx = roomDomain.effect<RenameRoomParams, Promise<void>, Error>()
export const joinRoomFx = roomDomain.effect<string, Promise<Room>, Error>()
