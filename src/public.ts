import { batchEvents } from "@42px/effector-extra"
import { TimelineWindow } from "matrix-js-sdk"
import { throttle } from "patronum/throttle"
import { matrixDomain } from "./domain"
import {
    CheckEventPermissionsParams,
    DeleteMessagePayload,
    DeleteMessageResult,
    EditMessagePayload,
    EventPermissions,
    InitRoomParams,
    LoadRoomParams,
    LoginByPasswordParams,
    LoginByTokenParams,
    LoginPayload,
    MappedRoom,
    MappedRoomMember,
    MappedUser,
    Message,
    MessageEvent,
    PaginateParams,
    ReadAllMessagesParams,
    RoomInfo,
    RoomWithActivity,
    SearchRoomMessagesPayload,
    SendMessagePayload,
    StartClientParams,
    UploadContentParams,
    UploadContentResult,
    UploadProgress,
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
export const readAllMessagesFx = matrixDomain
    .effect<ReadAllMessagesParams, void, Error>()
export const getRoomsWithActivitiesFx = matrixDomain
    .effect<MappedRoom[], RoomWithActivity[], Error>()
export const getRoomInfoFx = matrixDomain
    .effect<string, RoomInfo, Error>()
export const getLoggedUserFx = matrixDomain
    .effect<void, MappedUser | null, Error>()
export const checkEventPermissionsFx = matrixDomain
    .effect<CheckEventPermissionsParams, EventPermissions, Error>()
export const uploadContentFx = matrixDomain
    .effect<UploadContentParams, UploadContentResult, Error>()


export const $currentRoomId = matrixDomain
    .store<RoomWithActivity["roomId"] | null>(null)
export const $currentRoomMembers = matrixDomain
    .store<MappedRoomMember[] | null>(null)
export const $timelineWindow = matrixDomain.store<TimelineWindow | null>(null)
export const $messages = matrixDomain.store<Message[]>([])
export const $loadRoomFxPending = matrixDomain.store(false)
export const $paginateForwardPending = matrixDomain.store(false)
export const $paginateBackwardPending = matrixDomain.store(false)
export const $isLive = matrixDomain.store<boolean | null>(null)
export const $canPaginateBackward = matrixDomain.store(true)
export const $canPaginateForward = matrixDomain.store(true)

export const roomMessage = matrixDomain.event<MessageEvent>()
export const createRoomMessageBatch = (ms: number) =>
    batchEvents(roomMessage, ms)
export const onInitialSync = matrixDomain.event<MappedRoom[]>()
export const onCachedState = matrixDomain.event<MappedRoom[]>()
export const onSync = matrixDomain.event<MappedRoom[]>()
export const createOnSyncThrottled = (ms: number) =>
    throttle({ source: onSync, timeout: ms})
export const initRoom = matrixDomain.event<InitRoomParams>()
export const onRoomInitialized = matrixDomain.event<void>()
export const loadRoom = matrixDomain.event<LoadRoomParams>()
export const paginateForward = matrixDomain.event<PaginateParams>()
export const paginateBackward = matrixDomain.event<PaginateParams>()
export const onUploadProgress = matrixDomain.event<UploadProgress>()
