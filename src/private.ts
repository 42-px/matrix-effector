import { TimelineWindow } from "matrix-js-sdk"
import { matrixDomain } from "./domain"
import {
    InitRoomParams,
    LoadRoomFxParams,
    MappedRoomMember,
    MessageResponse,
    PaginateRoomFxParams,
    UpdateMessagesFxParams
} from "./types"

export const updateMessages = matrixDomain.event<void>()
export const setRoomMembers = matrixDomain.event<MappedRoomMember[]>()

export const initRoomFx = matrixDomain
    .effect<InitRoomParams, TimelineWindow, Error>()
export const loadRoomFx = matrixDomain
    .effect<LoadRoomFxParams, MessageResponse, Error>()
export const paginateRoomFx = matrixDomain
    .effect<PaginateRoomFxParams, MessageResponse, Error>()
export const updateMessagesFx = matrixDomain
    .effect<UpdateMessagesFxParams, MessageResponse, Error>()
export const getRoomMembersFx = matrixDomain
    .effect<string, MappedRoomMember[], Error>()
