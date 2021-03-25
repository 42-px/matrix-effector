import { matrixDomain } from "./domain"
import {
    DeleteMessagePayload,
    DeleteMessageResult,
    EditMessagePayload,
    LoginByPasswordParams,
    LoginPayload,
    Room,
    SendMessagePayload,
    StartClientParams,
    Message,
    LoginByTokenParams,
    InitTimelineWindowParams,
    TimelineWindowPaginationParams,
    SearchRoomMessagesPayload,
    LoadTimelineWindowParams,
    ReadAllMessagesParams,
    RoomWithActivity,
    MappedRoom,
    RoomInfo,
    MappedUser,
    MessageResponse,
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
export const getRoomTimelineFx = matrixDomain
    .effect<Room["roomId"], Message[], Error>()
export const initTimelineWindowFx = matrixDomain
    .effect<InitTimelineWindowParams, MessageResponse, Error>()
export const getTimelineWindowMessagesFx = matrixDomain
    .effect<void, Message[], Error>()
export const loadTimelineWindowFx = matrixDomain
    .effect<LoadTimelineWindowParams, MessageResponse, Error>()
export const paginateTimelineWindowFx = matrixDomain
    .effect<TimelineWindowPaginationParams, MessageResponse, Error>()
export const readAllMessagesFx = matrixDomain
    .effect<ReadAllMessagesParams, void, Error>()
export const getRoomsWithActivitiesFx = matrixDomain
    .effect<MappedRoom[], RoomWithActivity[], Error>()
export const getRoomInfoFx = matrixDomain
    .effect<string, RoomInfo, Error>()
export const getLoggedUserFx = matrixDomain
    .effect<void, MappedUser | null, Error>()
