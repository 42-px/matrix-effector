import { TimelineWindow } from "matrix-js-sdk"
import { RoomMember, MappedUser, Message } from "@/types"

export type InitRoomParams = {
    roomId: string
}
export type LoadRoomFxParams = {
    roomId: string
    timelineWindow: TimelineWindow
    initialEventId?: string
    initialWindowSize?: number
    loadAdditionalDataDirection: "BACKWARD" | "FORWARD"
}
export type MappedRoomMember = Pick<RoomMember,
  "membership" |
  "name" |
  "powerLevel" |
  "powerLevelNorm" |
  "rawDisplayName" |
  "roomId" |
  "typing" |
  "userId"
> & {
  user: MappedUser
}
export type MessageResponse = {
    messages: Message[]
    isLive: boolean
    canPaginateForward: boolean
    canPaginateBackward: boolean
}
export type LoadRoomParams = {
    initialEventId?: string
    initialWindowSize?: number
    loadAdditionalDataDirection?: "BACKWARD" | "FORWARD"
}
export type GoToMessageParams = {
    initialEventId: string
    initialWindowSize?: number
}

export interface CreateRoomParams {
    isDirect: boolean;
    name: string;
    invite: string[];
    visibility: "public" | "private";
}

export type InviteUserParams = {
    roomId: string;
    userId: string
}

export type KickUserParams = {
    roomId: string;
    userId: string;
    reason?: string;
}

export type RenameRoomParams = {
    roomId: string;
    name: string;
}