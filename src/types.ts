import {
    MatrixClient,
    MatrixEvent,
    Room,
    RoomMember,
    RoomSummary,
    TimelineWindow,
    User,
} from "matrix-js-sdk"

export {
    Room,
    LoginPayload,
    MatrixEvent,
    RoomMember,
} from "matrix-js-sdk"
export interface LoginByPasswordParams {
  user: string
  password: string
}

export type MappedUser = Pick<User,
  "userId" |
  "currentlyActive" |
  "displayName" |
  "lastActiveAgo" |
  "lastPresenceTs" |
  "presence"
>
export interface LoginByTokenParams {
  token: string
}
export interface EventPayload {
  event: MatrixEvent
  room: Room
}

export type LoadRoomFxParams = {
  roomId: string
  timelineWindow: TimelineWindow
  initialEventId?: string
  initialWindowSize?: number
}
export interface SearchRoomMessagesPayload {
  roomId: string
  term: string
}
export interface SendMessagePayload {
  roomId: string
  content: any
  txnId?: string
}
export interface EditMessagePayload {
  roomId: string
  eventId: string
  body: any
  txnId?: string
}
export interface DeleteMessagePayload {
  roomId: string
  eventId: string
  reason?: string
}
export interface DeleteMessageResult {
  eventId: string
}
export type StartClientParams = Parameters<MatrixClient["startClient"]>[0]
export type MessageContent = {
  body?: any
  msgtype?: string
};
export type MessageEvent = {
  eventId: string
  content: MessageContent
  originServerTs: Date
  roomId: string
  sender: RoomMember
  type: string
  relatedEventId?: string
  redaction: boolean
  redacted: boolean
  editing: boolean
}
export type Message = {
  originalEventId: string
  content: MessageContent
  sender: RoomMember
  originServerTs: Date
  edited: boolean
  redacted: boolean
}

export type MappedRoom = {
  roomId: string
  name: string
  summary: RoomSummary
}
export interface RoomWithActivity extends MappedRoom {
  unreadCount: number
  lastMessage?: Message
  isDirect: boolean
  directUserId?: string
  isOnline?: boolean
  lastActivityTS: number
}
export interface ReadAllMessagesParams {
  roomId: string
  eventId: string
}
export type EventListener = [string, (...args: any[]) => void]

export interface PaginateRoomFxParams {
  roomId: string
  timelineWindow: TimelineWindow
  direction: "forward" | "backward"
  size: number
  makeRequest?: boolean
  requestLimit?: number
}

export type GetSenderAvatarParams = {
  sender: RoomMember
  width: number
  height: number
  resizeMethod: "crop" | "scale"
  allowDefault?: boolean
  allowDirectLinks?: boolean
}

export type GetRoomMemberAvatarParams = {
  roomId: string
  userId: string
  width: number
  height: number
  resizeMethod: "crop" | "scale"
  allowDefault?: boolean
}

export type RoomInfo = {
  roomMembersCount: number
} 

export type MessageResponse = {
  messages: Message[]
  isLive: boolean
  eventsRetrieved: boolean
}

export type InitRoomParams = {
  roomId: string
}
export type LoadRoomParams = {
  initialEventId?: string
  initialWindowSize?: number
}
export type PaginateParams = {
  size: number
  makeRequest?: boolean
  requestLimit?: number
}
