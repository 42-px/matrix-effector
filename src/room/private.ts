import { TimelineWindow } from "matrix-js-sdk"
import {
    InitRoomParams,
    MappedRoomMember,
    RoomPowerLevels
} from "./types"
import { roomDomain } from "./domain"

export const initRoomFx = roomDomain
    .effect<InitRoomParams, TimelineWindow, Error>()
export const getRoomMembersFx = roomDomain
    .effect<string, MappedRoomMember[], Error>()
export const updatePowerLevelFx = roomDomain
    .effect<string, number, Error>()
export const updateRequiredPowerLevelForRoomFx = roomDomain
    .effect<string, RoomPowerLevels, Error>()
