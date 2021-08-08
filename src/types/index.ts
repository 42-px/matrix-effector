import {
    MatrixClient,
    MatrixEvent,
    Room,
    RoomMember,
    RoomSummary,
    TimelineWindow,
    User,
} from "matrix-js-sdk"
import { MessageContent } from "./content"

export * from "./content"

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
  "avatarUrl" |
  "userId" |
  "currentlyActive" |
  "displayName" |
  "lastActiveAgo" |
  "lastPresenceTs"
> & {
  presence: "online" | "offline" | "unavailable"
}
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
  loadAdditionalDataDirection: "BACKWARD" | "FORWARD"
}
export interface SearchRoomMessagesPayload {
  roomId: string
  term: string
  orderBy?: "recent" | "rank"
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
export interface DeleteMessageResult {
  eventId: string
}
export type StartClientParams = Parameters<MatrixClient["startClient"]>[0]

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

export interface UpdateMessagesFxParams {
  roomId: string
  timelineWindow: TimelineWindow
}
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
  canPaginateForward: boolean
  canPaginateBackward: boolean
}

export type InitRoomParams = {
  roomId: string
}
export type LoadRoomParams = {
  initialEventId?: string
  initialWindowSize?: number
  loadAdditionalDataDirection?: "BACKWARD" | "FORWARD"
}
export type PaginateParams = {
  size: number
  makeRequest?: boolean
  requestLimit?: number
}
export interface CheckEventPermissionsParams {
  eventId: string
  roomId: string
}

export interface EventPermissions {
  canRedact: boolean
  canEdit: boolean
}

export type MxcUrlToHttpParams = {
  mxcUrl: string
  width?: number
  height?: number
  resizeMethod?: "crop" | "scale"
  allowDirectLinks?: boolean
}

export interface UploadContentParams {
  file: any
  name?: string
  includeFilename?: boolean
  type?: string
  onlyContentUri?: boolean
  rawResponse?: boolean
}
export interface UploadContentResult {
  promise: Promise<string | { content_uri: string }>
  abort?: () => void 
}
export interface UploadProgress {
  file: any
  loaded: number
  total: number
}

export type MappedRoomMember = Pick<RoomMember,
  "membership" |
  "name" |
  "powerLevel" |
  "powerLevelNorm" |
  "rawDisplayName" |
  "roomId" |
  "typing" |
  "userId"
> & {
  user: MappedUser
}


export type UrlPreview = {
  "og:type"?: string
  "og:url"?: string
  "og:title"?: string
  "og:image"?: string
  "og:description"?: string
  "og:site_name"?: string
}

/* notification pushrules types */
export type NotificationOverrideRuleId = 
  ".m.rule.master" |
  ".m.rule.suppress_notices" | 
  ".m.rule.invite_for_me" | 
  ".m.rule.member_event" |
  ".m.rule.contains_display_name" | 
  ".m.rule.tombstone" | 
  ".m.rule.roomnotif"
  
export type NotificationUnderrideRuleId = 
  ".m.rule.call" |
  ".m.rule.encrypted_room_one_to_one" |
  ".m.rule.room_one_to_one" |
  ".m.rule.message" |
  ".m.rule.encrypted" 

export type NotificationContentRuleId = 
  ".m.rule.contains_user_name" 


export type NotificationAction = string | {
  set_tweak: "sound"
  value: string 
} | {
  set_tweak: "highlight"
  value: boolean
}

export type NotificationRule<RuleType> = {
  actions: NotificationAction[]
  default: boolean
  enabled: boolean
  rule_id: RuleType
}

export type NotificationKind = 
  "override" |
  "underride" | 
  "content" | 
  "sender" | 
  "room"

export type NotificationScope = "global" | "device"

export type NotificationRulesResult = {
  device: object
  global: {
    override: NotificationRule<NotificationOverrideRuleId>[]
    underride: NotificationRule<NotificationUnderrideRuleId>[]
    content: NotificationRule<NotificationContentRuleId>[]
    room: NotificationRule<string>[] /* rule_id -> roomId */
    sender: NotificationRule<string>[] /* rule_id -> sender_id */
  }
}

export type SetNotificationsRuleParams = {
  scope: NotificationScope
  kind: NotificationKind
  ruleId: 
    NotificationContentRuleId |
    NotificationUnderrideRuleId | 
    NotificationOverrideRuleId
  actions: ("notify" | "dont_notify" | "coalesce" | "set_tweak")[]
}

export type SetNotificationsRuleEnabledParams = {
  scope: NotificationScope
  kind: NotificationKind
  ruleId: 
    NotificationContentRuleId | 
    NotificationUnderrideRuleId | 
    NotificationOverrideRuleId
  enabled: boolean
}

