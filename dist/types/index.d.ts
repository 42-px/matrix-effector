import { MatrixClient, MatrixEvent, Room, RoomMember, RoomSummary, TimelineWindow, User } from "matrix-js-sdk";
import { MessageContent } from "./content";
export * from "./content";
export { Room, LoginPayload, MatrixEvent, RoomMember, } from "matrix-js-sdk";
export interface LoginByPasswordParams {
    user: string;
    password: string;
}
export declare type MappedUser = Pick<User, "avatarUrl" | "userId" | "currentlyActive" | "displayName" | "lastActiveAgo" | "lastPresenceTs"> & {
    presence: "online" | "offline" | "unavailable";
};
export interface LoginByTokenParams {
    token: string;
}
export interface EventPayload {
    event: MatrixEvent;
    room: Room;
}
export declare type LoadRoomFxParams = {
    roomId: string;
    timelineWindow: TimelineWindow;
    initialEventId?: string;
    initialWindowSize?: number;
    loadAdditionalDataDirection: "BACKWARD" | "FORWARD";
};
export interface SearchRoomMessagesPayload {
    roomId: string;
    term: string;
    orderBy?: "recent" | "rank";
}
export interface SendMessagePayload {
    roomId: string;
    content: MessageContent;
    txnId?: string;
}
export interface EditMessagePayload {
    roomId: string;
    eventId: string;
    body: string;
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
export interface UpdateMessagesFxParams {
    roomId: string;
    timelineWindow: TimelineWindow;
}
export interface PaginateRoomFxParams {
    roomId: string;
    timelineWindow: TimelineWindow;
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
export declare type MessageResponse = {
    messages: Message[];
    isLive: boolean;
    canPaginateForward: boolean;
    canPaginateBackward: boolean;
};
export declare type InitRoomParams = {
    roomId: string;
};
export declare type LoadRoomParams = {
    initialEventId?: string;
    initialWindowSize?: number;
    loadAdditionalDataDirection?: "BACKWARD" | "FORWARD";
};
export declare type PaginateParams = {
    size: number;
    makeRequest?: boolean;
    requestLimit?: number;
};
export interface CheckEventPermissionsParams {
    eventId: string;
    roomId: string;
}
export interface EventPermissions {
    canRedact: boolean;
    canEdit: boolean;
}
export declare type MxcUrlToHttpParams = {
    mxcUrl: string;
    width?: number;
    height?: number;
    resizeMethod?: "crop" | "scale";
    allowDirectLinks?: boolean;
};
export interface UploadContentParams {
    file: any;
    name?: string;
    includeFilename?: boolean;
    type?: string;
    onlyContentUri?: boolean;
    rawResponse?: boolean;
}
export interface UploadContentResult {
    promise: Promise<string | {
        content_uri: string;
    }>;
    abort?: () => void;
}
export interface UploadProgress {
    file: any;
    loaded: number;
    total: number;
}
export declare type MappedRoomMember = Pick<RoomMember, "membership" | "name" | "powerLevel" | "powerLevelNorm" | "rawDisplayName" | "roomId" | "typing" | "userId"> & {
    user: MappedUser;
};
