import { MessageResponse } from "@/room";
import { PaginateParams, PaginateRoomFxParams } from "./types";
export declare const paginateRoomFx: import("effector").Effect<PaginateRoomFxParams, MessageResponse, Error>;
export declare const paginateBackwardFx: import("effector").Effect<PaginateParams, MessageResponse, Error>;
export declare const paginateForwardFx: import("effector").Effect<PaginateParams, MessageResponse, Error>;
