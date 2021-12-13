import {
    EventType,
    ICreateClientOpts,
    MatrixEvent,
    Room,
    RoomMember,
    RoomSummary,
    SearchOrderBy,
    User,
} from "matrix-js-sdk"
import { MessageContent } from "./content"
export * from "./content"

export enum Presence {
    online = "online",
    offline = "offline", 
    unavailable = "unavailable",
} 

export type MappedUser = Pick<User,
    "avatarUrl" |
    "userId" |
    "currentlyActive" |
    "displayName" |
    "lastActiveAgo" |
    "lastPresenceTs"
> & {
    presence: Presence
}
export interface EventPayload {
    event: MatrixEvent
    room: Room
}

export interface SearchRoomMessagesPayload {
    roomId: string
    term: string
    orderBy?: SearchOrderBy
}

export type MessageEvent = {
    eventId: string
    content: MessageContent
    originServerTs: Date | null
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
    originServerTs: Date | null
    edited: boolean
    redacted: boolean
    seen?: boolean
}

export enum MatrixMembershipType {
    leave = "leave",
    invite = "invite",
    ban = "ban",
    join = "join",
    knock = "knock",
}

export type MappedRoom = {
    roomId: string
    name: string
    summary: RoomSummary
    myMembership: MatrixMembershipType | null
}

export interface RoomWithActivity extends MappedRoom {
    unreadCount: number
    lastMessage?: Message
    isDirect: boolean
    directUserId?: string
    isOnline?: boolean
    lastActivityTS: number
    powerlevels: RoomPowerLevelsContent
    myPowerLevel: number
    canKick: boolean
    canBan: boolean
    canInvite: boolean
}

export type EventListener = [string, (...args: any[]) => void]

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

export type MxcUrlToHttpParams = {
    mxcUrl: string
    width?: number
    height?: number
    resizeMethod?: "crop" | "scale"
    allowDirectLinks?: boolean
}

export type CreateClientOptions = {
    options: ICreateClientOpts
    messageBatchInterval?: number
}

export type MatrixLoginPayload = {
    user_id: string
    device_id: string
    access_token: string
    well_known?: string
}

type EventPowerLevels = {
    [EventType.RoomCanonicalAlias]: number
    [EventType.RoomAvatar]: number
    [EventType.RoomEncryption]: number
    [EventType.RoomHistoryVisibility]: number
    [EventType.RoomName]: number
    [EventType.RoomPowerLevels]: number
    [EventType.RoomServerAcl]: number
    [EventType.RoomTombstone]: number
}

export type RoomPowerLevelsContent = {
    ban: number
    events: EventPowerLevels
    users: {
        [key in string]: number 
    }
    redact: number
    kick: number
    invite: number
    state_default: number
    users_default: number
    events_default: number
}

export enum UserRole {
    admin = "Admin",
    moderator = "Moderator"
}
