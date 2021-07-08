import { TimelineWindow } from "matrix-js-sdk";
import { CheckEventPermissionsParams, DeleteMessagePayload, DeleteMessageResult, EditMessagePayload, EventPermissions, InitRoomParams, LoadRoomParams, LoginByPasswordParams, LoginByTokenParams, LoginPayload, MappedRoom, MappedRoomMember, MappedUser, Message, MessageEvent, PaginateParams, ReadAllMessagesParams, RoomInfo, RoomWithActivity, SearchRoomMessagesPayload, SendMessagePayload, UploadContentParams, UploadContentResult, UploadProgress, UrlPreview } from "./types";
export declare const loginByPasswordFx: import("effector").Effect<LoginByPasswordParams, LoginPayload, Error>;
export declare const loginByTokenFx: import("effector").Effect<LoginByTokenParams, LoginPayload, Error>;
export declare const initStoreFx: import("effector").Effect<void, void, Error>;
export declare const startClientFx: import("effector").Effect<number | {
    initialSyncLimit?: number | undefined;
    includeArchivedRooms?: boolean | undefined;
    resolveInvitesToProfiles?: boolean | undefined;
    pendingEventOrdering?: string | undefined;
    pollTimeout?: number | undefined;
    filter?: import("matrix-js-sdk").Filter | undefined;
    disablePresence?: boolean | undefined;
    lazyLoadMembers?: boolean | undefined;
} | undefined, void, Error>;
export declare const stopClientFx: import("effector").Effect<void, void, Error>;
export declare const searchRoomMessagesFx: import("effector").Effect<SearchRoomMessagesPayload, Message[], Error>;
export declare const sendMessageFx: import("effector").Effect<SendMessagePayload, void, Error>;
export declare const editMessageFx: import("effector").Effect<EditMessagePayload, void, Error>;
export declare const deleteMessageFx: import("effector").Effect<DeleteMessagePayload, DeleteMessageResult, Error>;
export declare const readAllMessagesFx: import("effector").Effect<ReadAllMessagesParams, void, Error>;
export declare const getRoomsWithActivitiesFx: import("effector").Effect<MappedRoom[], RoomWithActivity[], Error>;
export declare const getRoomInfoFx: import("effector").Effect<string, RoomInfo, Error>;
export declare const getLoggedUserFx: import("effector").Effect<void, MappedUser | null, Error>;
export declare const checkEventPermissionsFx: import("effector").Effect<CheckEventPermissionsParams, EventPermissions, Error>;
export declare const uploadContentFx: import("effector").Effect<UploadContentParams, UploadContentResult, Error>;
export declare const getUrlPreviewFx: import("effector").Effect<{
    url: string;
    ts: number;
    timeout?: number | undefined;
}, UrlPreview, Error>;
export declare const $currentRoomId: import("effector").Store<string | null>;
export declare const $currentRoomMembers: import("effector").Store<MappedRoomMember[] | null>;
export declare const $timelineWindow: import("effector").Store<TimelineWindow | null>;
export declare const $messages: import("effector").Store<Message[]>;
export declare const $loadRoomFxPending: import("effector").Store<boolean>;
export declare const $paginateForwardPending: import("effector").Store<boolean>;
export declare const $paginateBackwardPending: import("effector").Store<boolean>;
export declare const $isLive: import("effector").Store<boolean | null>;
export declare const $canPaginateBackward: import("effector").Store<boolean>;
export declare const $canPaginateForward: import("effector").Store<boolean>;
export declare const roomMessage: import("effector").Event<MessageEvent>;
export declare const createRoomMessageBatch: (ms: number) => import("effector").Event<MessageEvent[]>;
export declare const onInitialSync: import("effector").Event<MappedRoom[]>;
export declare const onCachedState: import("effector").Event<MappedRoom[]>;
export declare const onSync: import("effector").Event<MappedRoom[]>;
export declare const createOnSyncThrottled: (ms: number) => import("effector").Event<MappedRoom[]>;
export declare const initRoom: import("effector").Event<InitRoomParams>;
export declare const onRoomInitialized: import("effector").Event<void>;
export declare const loadRoom: import("effector").Event<LoadRoomParams>;
export declare const paginateForward: import("effector").Event<PaginateParams>;
export declare const paginateBackward: import("effector").Event<PaginateParams>;
export declare const onUploadProgress: import("effector").Event<UploadProgress>;
