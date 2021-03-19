import { SearchResponse } from "matrix-js-sdk"
import { matrixDomain } from "./domain"
import {
    DeleteMessagePayload,
    DeleteMessageResult,
    EditMessagePayload,
    LoginByPasswordParams,
    LoginPayload,
    Room,
    SearchMessageTextPayload,
    SendMessagePayload,
    StartClientParams,
    Message,
    LoginByTokenParams,
    InitTimelineWindowParams,
    TimelineWindowPaginationParams,
    SearchPayload,
    LoadTimelineWindowParams,
    ReadAllMessagesParams,
    RoomWithActivity,
    MappedRoom,
    RoomInfo,
    MappedUser,
} from "./types"

export const loginByPasswordFx = matrixDomain
    .effect<LoginByPasswordParams, LoginPayload, Error>()
export const loginByTokenFx = matrixDomain
    .effect<LoginByTokenParams, LoginPayload, Error>()
export const initStoreFx = matrixDomain.effect<void, void, Error>()
export const startClientFx = matrixDomain
    .effect<StartClientParams, void, Error>()
export const stopClientFx = matrixDomain.effect<void, void, Error>()
export const searchFx = matrixDomain.effect<SearchPayload, Message[], Error>()
export const searchMessageTextFx = matrixDomain
    .effect<SearchMessageTextPayload, SearchResponse, Error>()
export const sendMessageFx = matrixDomain
    .effect<SendMessagePayload, void, Error>()
export const editMessageFx = matrixDomain
    .effect<EditMessagePayload, void, Error>()
export const deleteMessageFx = matrixDomain
    .effect<DeleteMessagePayload, DeleteMessageResult, Error>()
export const getRoomTimelineFx = matrixDomain
    .effect<Room["roomId"], Message[], Error>()
export const initTimelineWindowFx = matrixDomain
    .effect<InitTimelineWindowParams, Message[], Error>()
export const getTimelineWindowMessagesFx = matrixDomain
    .effect<void, Message[], Error>()
export const loadTimelineWindowFx = matrixDomain
    .effect<LoadTimelineWindowParams, Message[], Error>()
export const paginateTimelineWindowFx = matrixDomain
    .effect<TimelineWindowPaginationParams, Message[], Error>()
export const readAllMessagesFx = matrixDomain
    .effect<ReadAllMessagesParams, void, Error>()
export const getRoomsWithActivitiesFx = matrixDomain
    .effect<MappedRoom[], RoomWithActivity[], Error>()
export const getRoomInfoFx = matrixDomain
    .effect<string, RoomInfo, Error>()
export const getLoggedUser = matrixDomain
    .effect<void, MappedUser | null, Error>()
