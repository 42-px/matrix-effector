import { RoomMember, TimelineWindow, User } from "matrix-js-sdk";
import { RoomWithActivity } from "@/types";
import { InitRoomParams, LoadRoomFxParams, MappedRoomMember, MessageResponse, RoomPowerLevels } from "./types";
export declare const $loadFilter: import("effector").Store<boolean>;
export declare const onRoomUserUpdate: import("effector").Event<User>;
export declare const onRoomMemberUpdate: import("effector").Event<RoomMember>;
export declare const getRoomMembers: import("effector").Event<void>;
export declare const getRoomByIdFx: import("effector").Effect<string, RoomWithActivity | null, Error>;
export declare const initRoomFx: import("effector").Effect<InitRoomParams, TimelineWindow, Error>;
export declare const loadRoomFx: import("effector").Effect<LoadRoomFxParams, MessageResponse, Error>;
export declare const getRoomMembersFx: import("effector").Effect<string, MappedRoomMember[], Error>;
export declare const updatePowerLevelFx: import("effector").Effect<string, number, Error>;
export declare const updateRequiredPowerLevelForRoomFx: import("effector").Effect<string, RoomPowerLevels, Error>;
