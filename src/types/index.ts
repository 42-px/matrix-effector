import {
    MatrixEvent,
    Room,
    RoomMember,
    User,
} from "matrix-js-sdk"
import { RoomSummary } from "matrix-js-sdk/src/models/room-summary"
import { MessageContent } from "./content"

export * from "./content"

export {
    Room,
    MatrixEvent,
    RoomMember,
} from "matrix-js-sdk"

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
export interface EventPayload {
    event: MatrixEvent
    room: Room
}

export interface SearchRoomMessagesPayload {
    roomId: string
    term: string
    orderBy?: "recent" | "rank"
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
}

export type MappedRoom = {
    roomId: string
    name: string
    summary: RoomSummary
    myMembership: string | null
}
export interface RoomWithActivity extends MappedRoom {
    unreadCount: number
    lastMessage?: Message
    isDirect: boolean
    directUserId?: string
    isOnline?: boolean
    lastActivityTS: number
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
