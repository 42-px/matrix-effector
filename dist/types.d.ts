import { MatrixClient, MatrixEvent, RawEvent, Room, RoomMember, RoomSummary, User } from "matrix-js-sdk";
export { Room, LoginPayload, MatrixEvent, RoomMember, } from "matrix-js-sdk";
export interface LoginByPasswordParams {
    user: string;
    password: string;
}
export declare type MappedUser = Pick<User, "userId" | "currentlyActive" | "displayName" | "lastActiveAgo" | "lastPresenceTs" | "presence">;
export interface LoginByTokenParams {
    token: string;
}
export interface EventPayload {
    event: MatrixEvent;
    room: Room;
}
export declare type LoadTimelineWindowParams = {
    initialEventId?: string;
    initialWindowSize?: number;
};
export interface SearchRoomMessagesPayload {
    roomId: string;
    term: string;
}
export interface SendMessagePayload {
    roomId: string;
    content: any;
    txnId?: string;
}
export interface EditMessagePayload {
    roomId: string;
    eventId: string;
    body: any;
    txnId?: string;
}
export interface DeleteMessagePayload {
    roomId: string;
    eventId: string;
    reason?: string;
}
export interface DeleteMessageResult {
    eventId: string;
}
export declare type StartClientParams = Parameters<MatrixClient["startClient"]>[0];
export declare type MessageContent = {
    body?: any;
    msgtype?: string;
};
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
export interface ReadAllMessagesParams {
    roomId: string;
    eventId: string;
}
export declare type EventListener = [string, (...args: any[]) => void];
export interface InitTimelineWindowParams {
    roomId: Room["roomId"];
    initialEventId?: RawEvent["event_id"];
    initialWindowSize?: number;
}
export interface TimelineWindowPaginationParams {
    direction: "forward" | "backward";
    size: number;
    makeRequest?: boolean;
    requestLimit?: number;
}
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
