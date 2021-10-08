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
    isDirect: boolean;
    name: string;
    invite: string[];
    visibility: "public" | "private";
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
