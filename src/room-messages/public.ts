import {
    ISendEventResponse
} from "matrix-js-sdk/lib/@types/requests";
import {
    CheckEventPermissionsParams,
    DeleteMessagePayload,
    EditMessagePayload,
    EventPermissions,
    ReadAllMessagesParams,
    SendMessagePayload,
    UploadContentParams,
    UploadProgress,
    UrlPreview
} from "./types"
import {
    messagesDomain
} from "./domain"
import {
    DeleteMessageResult,
    UploadContentResult
} from "./types"
import { Message } from "@/types"

export const $messages = messagesDomain.store<Message[]>([])

export const roomMessage = messagesDomain.event<Message>()
export const newMessagesLoaded = messagesDomain.event<Message[]>()
export const onUploadProgress = messagesDomain.event<UploadProgress>()

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
