import { ISendEventResponse } from "matrix-js-sdk"
import {
    CheckEventPermissionsParams,
    DeleteMessagePayload,
    EditMessagePayload,
    EventPermissions,
    ReadAllMessagesParams,
    SendMessagePayload,
    UploadContentParams,
    UploadProgress,
    UrlPreview,
    PaginateParams,
    DeleteMessageResult,
    UploadContentResult
} from "./types"
import { messagesDomain } from "./domain"
import { Message } from "@/types"

export const $messages = messagesDomain.store<Message[]>([])
export const $currentRoomUnreadMessageCount = messagesDomain
    .store<number | null>(null)

export const updateMessages = messagesDomain.event<void>()
export const roomMessage = messagesDomain.event<Message>()
export const newMessagesLoaded = messagesDomain.event<Message[]>()
export const onUploadProgress = messagesDomain.event<UploadProgress>()
export const onPaginateBackwardDone = messagesDomain.event<void>()
export const onPaginateForwardDone = messagesDomain.event<void>()
export const paginateForward = messagesDomain.event<PaginateParams>()
export const paginateBackward = messagesDomain.event<PaginateParams>()

export const $paginateForwardPending = messagesDomain.store(false)
export const $paginateBackwardPending = messagesDomain.store(false)
export const $canPaginateBackward = messagesDomain.store(true)
export const $canPaginateForward = messagesDomain.store(true)

export const sendMessageFx = messagesDomain
    .effect<SendMessagePayload, ISendEventResponse, Error>()
export const editMessageFx = messagesDomain
    .effect<EditMessagePayload, ISendEventResponse, Error>()
export const deleteMessageFx = messagesDomain
    .effect<DeleteMessagePayload, DeleteMessageResult, Error>()
export const readAllMessagesFx = messagesDomain
    .effect<ReadAllMessagesParams, void, Error>()
export const checkEventPermissionsFx = messagesDomain
    .effect<CheckEventPermissionsParams, EventPermissions, Error>()
export const uploadContentFx = messagesDomain
    .effect<UploadContentParams, UploadContentResult, Error>()
export const getUrlPreviewFx = messagesDomain
    .effect<{url: string; ts: number; timeout?: number}, UrlPreview, Error >()
