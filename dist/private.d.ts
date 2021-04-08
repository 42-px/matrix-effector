import { TimelineWindow } from "matrix-js-sdk";
import { InitRoomParams, LoadRoomFxParams, MessageResponse, PaginateRoomFxParams } from "./types";
export declare const initRoomFx: import("effector").Effect<InitRoomParams, TimelineWindow, Error>;
export declare const loadRoomFx: import("effector").Effect<LoadRoomFxParams, MessageResponse, Error>;
export declare const paginateRoomFx: import("effector").Effect<PaginateRoomFxParams, MessageResponse, Error>;
