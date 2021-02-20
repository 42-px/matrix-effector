import { MappedRoom, MessageEvent } from "./types";
export declare const roomMessage: import("effector").Event<MessageEvent>;
export declare const createRoomMessageBatch: (ms: number) => import("effector").Event<MessageEvent[]>;
export declare const onInitialSync: import("effector").Event<MappedRoom[]>;
export declare const onCachedState: import("effector").Event<MappedRoom[]>;
export declare const onSync: import("effector").Event<MappedRoom[]>;
export declare const createOnSyncThrottled: (ms: number) => import("effector").Event<MappedRoom[]>;
