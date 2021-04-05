import { TimelineWindow } from "matrix-js-sdk";
import { Message } from "./types";
export declare const $roomId: import("effector").Store<string | null>;
export declare const $timelineWindow: import("effector").Store<TimelineWindow | null>;
export declare const $messages: import("effector").Store<Message[]>;
export declare const $loadRoomFxPending: import("effector").Store<boolean>;
export declare const $paginateRoomFxPending: import("effector").Store<boolean>;
