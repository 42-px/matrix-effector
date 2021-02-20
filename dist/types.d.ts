import { MatrixClient, MatrixEvent, RawEvent, Room, RoomMember, RoomSummary } from "matrix-js-sdk";
export { Room, LoginPayload, MatrixEvent, RoomMember, } from "matrix-js-sdk";
export interface LoginByPasswordParams {
    user: string;
    password: string;
}
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
export declare type SearchPayload = Parameters<MatrixClient["search"]>[0];
export interface SearchMessageTextPayload {
    query: string;
    keys?: "content.body" | "content.name" | "content.topic";
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