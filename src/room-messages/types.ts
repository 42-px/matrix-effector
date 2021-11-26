import { TimelineWindow } from "matrix-js-sdk"
import { MessageContent } from "@/types"

export interface PaginateRoomFxParams {
  roomId: string
  timelineWindow: TimelineWindow
  direction: "forward" | "backward"
  size: number
  makeRequest?: boolean
  requestLimit?: number
}

export type PaginateParams = {
  size: number
  makeRequest?: boolean
  requestLimit?: number
}

export interface DeleteMessageResult {
    eventId: string
}
export interface UploadContentResult {
    promise: Promise<string | { content_uri: string }>
    abort?: () => void 
}
export interface UpdateMessagesFxParams {
    roomId: string
    timelineWindow: TimelineWindow
}
export interface CheckEventPermissionsParams {
    eventId: string
    roomId: string
}
export interface EventPermissions {
    canRedact: boolean
    canEdit: boolean
}
export interface SendMessagePayload {
    roomId: string
    content: MessageContent
    txnId?: string
}
export interface EditMessagePayload {
    roomId: string
    eventId: string
    body: string
    txnId?: string
}
export interface DeleteMessagePayload {
    roomId: string
    eventId: string
    reason?: string
}
export interface ReadAllMessagesParams {
    roomId: string
    eventId: string
}
export interface UploadContentParams {
    file: any
    name?: string
    includeFilename?: boolean
    type?: string
    onlyContentUri?: boolean
    rawResponse?: boolean
}
export interface UploadProgress {
    file: any
    loaded: number
    total: number
}
  
export type UrlPreview = {
    "og:type"?: string
    "og:url"?: string
    "og:title"?: string
    "og:image"?: string
    "og:description"?: string
    "og:site_name"?: string
}
