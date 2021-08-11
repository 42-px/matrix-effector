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
export declare type UrlPreview = {
    "og:type"?: string;
    "og:url"?: string;
    "og:title"?: string;
    "og:image"?: string;
    "og:description"?: string;
    "og:site_name"?: string;
};
export declare type NotificationOverrideRuleId = ".m.rule.master" | ".m.rule.suppress_notices" | ".m.rule.invite_for_me" | ".m.rule.member_event" | ".m.rule.contains_display_name" | ".m.rule.tombstone" | ".m.rule.roomnotif";
export declare type NotificationUnderrideRuleId = ".m.rule.call" | ".m.rule.encrypted_room_one_to_one" | ".m.rule.room_one_to_one" | ".m.rule.message" | ".m.rule.encrypted";
export declare type NotificationContentRuleId = ".m.rule.contains_user_name";
export declare type NotificationAction = string | {
    set_tweak: "sound";
    value: string;
} | {
    set_tweak: "highlight";
    value: boolean;
};
export declare type NotificationRule<RuleType> = {
    actions: NotificationAction[];
    default: boolean;
    enabled: boolean;
    rule_id: RuleType;
};
export declare type NotificationKind = "override" | "underride" | "content" | "sender" | "room";
export declare type NotificationScope = "global" | "device";
export declare type NotificationRulesResult = {
    device: object;
    global: {
        override: NotificationRule<NotificationOverrideRuleId>[];
        underride: NotificationRule<NotificationUnderrideRuleId>[];
        content: NotificationRule<NotificationContentRuleId>[];
        room: NotificationRule<string>[];
        sender: NotificationRule<string>[];
    };
};
export declare type NotificationTweak = "sound" | "highlight";
export declare type SetNotificationsRuleParams = {
    scope: NotificationScope;
    kind: NotificationKind;
    ruleId: NotificationContentRuleId | NotificationUnderrideRuleId | NotificationOverrideRuleId | string;
    actions: ("notify" | "dont_notify" | "coalesce" | "set_tweak") | {
        set_tweak: NotificationTweak;
        value: string;
    }[];
};
export declare type SetNotificationsRuleEnabledParams = {
    scope: NotificationScope;
    kind: NotificationKind;
    ruleId: NotificationContentRuleId | NotificationUnderrideRuleId | NotificationOverrideRuleId | string;
    enabled: boolean;
};
export declare type DeleteNotificationsRuleEnabledParams = {
    scope: NotificationScope;
    kind: NotificationKind;
    ruleId: NotificationContentRuleId | NotificationUnderrideRuleId | NotificationOverrideRuleId | string;
};
