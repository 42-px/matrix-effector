import { TimelineWindow } from "matrix-js-sdk";
import { InitRoomParams, LoadRoomFxParams, MessageResponse, PaginateRoomFxParams, UpdateMessagesFxParams } from "./types";
export declare const updateMessages: import("effector").Event<void>;
export declare const initRoomFx: import("effector").Effect<InitRoomParams, TimelineWindow, Error>;
export declare const loadRoomFx: import("effector").Effect<LoadRoomFxParams, MessageResponse, Error>;
export declare const paginateRoomFx: import("effector").Effect<PaginateRoomFxParams, MessageResponse, Error>;
export declare const updateMessagesFx: import("effector").Effect<UpdateMessagesFxParams, MessageResponse, Error>;
