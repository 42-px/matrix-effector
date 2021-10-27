import { TimelineWindow, Room } from "matrix-js-sdk";
import { MappedRoom, MappedUser, Message, RoomInfo, RoomWithActivity, SearchRoomMessagesPayload } from "@/types";
import { GoToMessageParams, InitRoomParams, LoadRoomParams, MappedRoomMember, CreateRoomParams, InviteUserParams, KickUserParams, RenameRoomParams, CreateDirectRoomParams } from "./types";
export declare const $isLive: import("effector").Store<boolean | null>;
export declare const $loadRoomFxPending: import("effector").Store<boolean>;
export declare const $currentRoomMembers: import("effector").Store<MappedRoomMember[] | null>;
export declare const $currentRoomId: import("effector").Store<string | null>;
export declare const clearCurrentRoomState: import("effector").Event<void>;
export declare const $timelineWindow: import("effector").Store<TimelineWindow | null>;
export declare const $myPowerLevel: import("effector").Store<number>;
export declare const initRoom: import("effector").Event<InitRoomParams>;
export declare const liveTimelineLoaded: import("effector").Event<void>;
export declare const onRoomInitialized: import("effector").Event<void>;
export declare const loadRoomMessageDone: import("effector").Event<void>;
export declare const onRoomLoaded: import("effector").Event<void>;
export declare const loadRoom: import("effector").Event<LoadRoomParams>;
export declare const toLiveTimeline: import("effector").Event<void>;
export declare const loadRoomMessage: import("effector").Event<GoToMessageParams>;
export declare const directRoomCreated: import("effector").Event<Room>;
export declare const roomCreated: import("effector").Event<Room>;
export declare const searchRoomMessagesFx: import("effector").Effect<SearchRoomMessagesPayload, Message[], Error>;
export declare const getRoomsWithActivitiesFx: import("effector").Effect<MappedRoom[], RoomWithActivity[], Error>;
export declare const getRoomInfoFx: import("effector").Effect<string, RoomInfo, Error>;
export declare const getAllUsersFx: import("effector").Effect<void, MappedUser[], Error>;
export declare const createRoomFx: import("effector").Effect<CreateRoomParams, {
    roomId: string;
}, Error>;
export declare const createDirectRoomFx: import("effector").Effect<CreateDirectRoomParams, {
    roomId: string;
}, Error>;
export declare const inviteUserFx: import("effector").Effect<InviteUserParams, void, Error>;
export declare const kickUserRoomFx: import("effector").Effect<KickUserParams, void, Error>;
export declare const renameRoomFx: import("effector").Effect<RenameRoomParams, void, Error>;
export declare const joinRoomFx: import("effector").Effect<{
    roomId: string;
    isDirect?: boolean | undefined;
}, RoomWithActivity, Error>;
