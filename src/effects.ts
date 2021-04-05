import { TimelineWindow } from "matrix-js-sdk"
import { matrixDomain } from "./domain"
import {
    DeleteMessagePayload,
    DeleteMessageResult,
    EditMessagePayload,
    LoginByPasswordParams,
    LoginPayload,
    SendMessagePayload,
    StartClientParams,
    Message,
    LoginByTokenParams,
    PaginateRoomFxParams,
    SearchRoomMessagesPayload,
    LoadRoomFxParams,
    ReadAllMessagesParams,
    RoomWithActivity,
    MappedRoom,
    RoomInfo,
    MappedUser,
    MessageResponse,
    InitRoomParams,
} from "./types"

export const loginByPasswordFx = matrixDomain
    .effect<LoginByPasswordParams, LoginPayload, Error>()
export const loginByTokenFx = matrixDomain
    .effect<LoginByTokenParams, LoginPayload, Error>()
export const initStoreFx = matrixDomain.effect<void, void, Error>()
export const startClientFx = matrixDomain
    .effect<StartClientParams, void, Error>()
export const stopClientFx = matrixDomain.effect<void, void, Error>()
export const searchRoomMessagesFx = matrixDomain
    .effect<SearchRoomMessagesPayload, Message[], Error>()
export const sendMessageFx = matrixDomain
    .effect<SendMessagePayload, void, Error>()
export const editMessageFx = matrixDomain
    .effect<EditMessagePayload, void, Error>()
export const deleteMessageFx = matrixDomain
    .effect<DeleteMessagePayload, DeleteMessageResult, Error>()
export const loadRoomFx = matrixDomain
    .effect<LoadRoomFxParams, MessageResponse, Error>()
export const paginateRoomFx = matrixDomain
    .effect<PaginateRoomFxParams, MessageResponse, Error>()
export const readAllMessagesFx = matrixDomain
    .effect<ReadAllMessagesParams, void, Error>()
export const getRoomsWithActivitiesFx = matrixDomain
    .effect<MappedRoom[], RoomWithActivity[], Error>()
export const getRoomInfoFx = matrixDomain
    .effect<string, RoomInfo, Error>()
export const getLoggedUserFx = matrixDomain
    .effect<void, MappedUser | null, Error>()
export const initRoomFx = matrixDomain
    .effect<InitRoomParams, TimelineWindow, Error>()
