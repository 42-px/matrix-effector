import { combine } from "effector"
import { TimelineWindow } from "matrix-js-sdk"
import { RoomWithActivity } from "@/types"
import {
    InitRoomParams,
    LoadRoomFxParams,
    MappedRoomMember,
    MessageResponse, RoomPowerLevels
} from "./types"
import { roomDomain } from "./domain"
import { $currentRoomId, $timelineWindow } from "./public"

export const $loadFilter = combine(
    $currentRoomId,
    $timelineWindow,
    (roomId, timelineWindow) => Boolean(roomId) && Boolean(timelineWindow)
)

export const getRoomByIdFx = roomDomain
    .effect<RoomWithActivity["roomId"], RoomWithActivity | null, Error>()
export const initRoomFx = roomDomain
    .effect<InitRoomParams, TimelineWindow, Error>()
export const loadRoomFx = roomDomain
    .effect<LoadRoomFxParams, MessageResponse, Error>()
export const getRoomMembersFx = roomDomain
    .effect<string, MappedRoomMember[], Error>()
export const updatePowerLevelFx = roomDomain
    .effect<string, number, Error>()
export const updateRequiredPowerLevelForRoomFx = roomDomain
    .effect<string, RoomPowerLevels, Error>()
