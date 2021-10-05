import { MessageResponse } from "@/room";
import { UpdateMessagesFxParams } from "./types";
export declare const updateMessages: import("effector").Event<void>;
export declare const updateMessagesFx: import("effector").Effect<UpdateMessagesFxParams, MessageResponse, Error>;
export declare const setMessages: import("effector").Event<{
    messages: import("..").Message[];
    isLive: boolean;
    canPaginateForward: boolean;
    canPaginateBackward: boolean;
    currentRoomId: string | null;
    roomId: string;
}>;
