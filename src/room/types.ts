import {
    TimelineWindow,
    RoomMember
} from "matrix-js-sdk"
import {
    MappedUser,
    Message
} from "@/types"

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
    name: string
    invite: string[]
    visibility: Visibility
    initialState?: InitialState[]
    preset?: Preset
}

export interface CreateDirectRoomParams {
    user: MappedUser
    initialState?: InitialState[]
    preset?: Preset
}

export enum Visibility {
    "public" = "public",
    "private" = "private"
}

export enum Preset {
    trustedPrivateChat = "trusted_private_chat",
    privateChat = "private_chat",
    publicChat = "public_chat"
}

export interface InitialState {
    content: Object
    stateKey: string
    type: string
}

export type InviteUserParams = {
    roomId: string
    usersIds: string[]
}

export type KickUserParams = {
    roomId: string
    userId: string
    reason?: string
}

export type RenameRoomParams = {
    roomId: string
    name: string
}

export type RoomPowerLevels = {
    ban: number
    kick: number
    invite: number
    defaultEvents: number
    redact: number
    stateDefault: number
}

export type SendTypingParams = {
    roomId: string
    isTyping: boolean
  }
