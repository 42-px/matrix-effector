import { CheckEventPermissionsParams, DeleteMessagePayload, EditMessagePayload, EventPermissions, ReadAllMessagesParams, SendMessagePayload, UploadContentParams, UploadProgress, UrlPreview } from "./types";
import { DeleteMessageResult, UploadContentResult } from "./types";
import { Message } from "@/types";
export declare const $messages: import("effector").Store<Message[]>;
export declare const roomMessage: import("effector").Event<Message>;
export declare const newMessagesLoaded: import("effector").Event<Message[]>;
export declare const onUploadProgress: import("effector").Event<UploadProgress>;
export declare const sendMessageFx: import("effector").Effect<SendMessagePayload, void, Error>;
export declare const editMessageFx: import("effector").Effect<EditMessagePayload, void, Error>;
export declare const deleteMessageFx: import("effector").Effect<DeleteMessagePayload, DeleteMessageResult, Error>;
export declare const readAllMessagesFx: import("effector").Effect<ReadAllMessagesParams, void, Error>;
export declare const checkEventPermissionsFx: import("effector").Effect<CheckEventPermissionsParams, EventPermissions, Error>;
export declare const uploadContentFx: import("effector").Effect<UploadContentParams, UploadContentResult, Error>;
export declare const getUrlPreviewFx: import("effector").Effect<{
    url: string;
    ts: number;
    timeout?: number | undefined;
}, UrlPreview, Error>;
