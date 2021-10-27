import { TimelineWindow } from "matrix-js-sdk";
import { RoomMember, MappedUser, Message } from "@/types";
export declare type InitRoomParams = {
    roomId: string;
};
export declare type LoadRoomFxParams = {
    roomId: string;
    timelineWindow: TimelineWindow;
    initialEventId?: string;
    initialWindowSize?: number;
    loadAdditionalDataDirection: "BACKWARD" | "FORWARD";
};
export declare type MappedRoomMember = Pick<RoomMember, "membership" | "name" | "powerLevel" | "powerLevelNorm" | "rawDisplayName" | "roomId" | "typing" | "userId"> & {
    user: MappedUser;
};
export declare type MessageResponse = {
    messages: Message[];
    isLive: boolean;
    canPaginateForward: boolean;
    canPaginateBackward: boolean;
};
export declare type LoadRoomParams = {
    initialEventId?: string;
    initialWindowSize?: number;
    loadAdditionalDataDirection?: "BACKWARD" | "FORWARD";
};
export declare type GoToMessageParams = {
    initialEventId: string;
    initialWindowSize?: number;
};
export interface CreateRoomParams {
    name: string;
    invite: string[];
    visibility: Visibility;
    initialState?: InitialState[];
    preset?: Preset;
}
export interface CreateDirectRoomParams {
    user: MappedUser;
    initialState?: InitialState[];
    preset?: Preset;
}
export declare enum Visibility {
    public = "public",
    private = "private"
}
export declare enum Preset {
    trustedPrivateChat = "trusted_private_chat",
    privateChat = "private_chat",
    publicChat = "public_chat"
}
export interface InitialState {
    content: Object;
    stateKey: string;
    type: string;
}
export declare type InviteUserParams = {
    roomId: string;
    userId: string;
};
export declare type KickUserParams = {
    roomId: string;
    userId: string;
    reason?: string;
};
export declare type RenameRoomParams = {
    roomId: string;
    name: string;
};
export declare type RoomPowerLevels = {
    ban: number;
    kick: number;
    invite: number;
    defaultEvents: number;
    redact: number;
    stateDefault: number;
};
