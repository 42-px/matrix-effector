import { RoomMember, TimelineWindow, User } from "matrix-js-sdk"
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
export const getRoomMembers = matrixDomain.event<void>()
export const onRoomMemberUpdate = matrixDomain.event<RoomMember>()
export const onRoomUserUpdate = matrixDomain.event<User>()

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
