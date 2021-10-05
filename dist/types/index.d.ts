import { MatrixEvent, Room, RoomMember, RoomSummary, User } from "matrix-js-sdk";
import { MessageContent } from "./content";
export * from "./content";
export { Room, LoginPayload, MatrixEvent, RoomMember, } from "matrix-js-sdk";
export declare type MappedUser = Pick<User, "avatarUrl" | "userId" | "currentlyActive" | "displayName" | "lastActiveAgo" | "lastPresenceTs"> & {
    presence: "online" | "offline" | "unavailable";
};
export interface EventPayload {
    event: MatrixEvent;
    room: Room;
}
export interface SearchRoomMessagesPayload {
    roomId: string;
    term: string;
    orderBy?: "recent" | "rank";
}
export declare type MessageEvent = {
    eventId: string;
    content: MessageContent;
    originServerTs: Date;
    roomId: string;
    sender: RoomMember;
    type: string;
    relatedEventId?: string;
    redaction: boolean;
    redacted: boolean;
    editing: boolean;
};
export declare type Message = {
    originalEventId: string;
    content: MessageContent;
    sender: RoomMember;
    originServerTs: Date;
    edited: boolean;
    redacted: boolean;
};
export declare type MappedRoom = {
    roomId: string;
    name: string;
    summary: RoomSummary;
};
export interface RoomWithActivity extends MappedRoom {
    unreadCount: number;
    lastMessage?: Message;
    isDirect: boolean;
    directUserId?: string;
    isOnline?: boolean;
    lastActivityTS: number;
}
export declare type EventListener = [string, (...args: any[]) => void];
export declare type GetSenderAvatarParams = {
    sender: RoomMember;
    width: number;
    height: number;
    resizeMethod: "crop" | "scale";
    allowDefault?: boolean;
    allowDirectLinks?: boolean;
};
export declare type GetRoomMemberAvatarParams = {
    roomId: string;
    userId: string;
    width: number;
    height: number;
    resizeMethod: "crop" | "scale";
    allowDefault?: boolean;
};
export declare type RoomInfo = {
    roomMembersCount: number;
};
export declare type MxcUrlToHttpParams = {
    mxcUrl: string;
    width?: number;
    height?: number;
    resizeMethod?: "crop" | "scale";
    allowDirectLinks?: boolean;
};
