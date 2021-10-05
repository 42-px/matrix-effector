import { combine } from "effector"
import { RoomMember, TimelineWindow, User } from "matrix-js-sdk"
import {
    InitRoomParams,
    LoadRoomFxParams,
    MappedRoomMember,
    MessageResponse
} from "./types"
import { roomDomain } from "./domain"
import { $currentRoomId, $timelineWindow } from "./public"

export const $loadFilter = combine(
    $currentRoomId,
    $timelineWindow,
    (roomId, timelineWindow) => Boolean(roomId) && Boolean(timelineWindow)
)

export const onRoomUserUpdate = roomDomain.event<User>()
export const onRoomMemberUpdate = roomDomain.event<RoomMember>()
export const getRoomMembers = roomDomain.event<void>()

export const initRoomFx = roomDomain
    .effect<InitRoomParams, TimelineWindow, Error>()
export const loadRoomFx = roomDomain
    .effect<LoadRoomFxParams, MessageResponse, Error>()
export const getRoomMembersFx = roomDomain
    .effect<string, MappedRoomMember[], Error>()
