import { guard, sample } from "effector"
import { $currentRoomId, MessageResponse } from "@/room"
import { paginateRoomFx } from "@/room-pagination/private"
import { loadRoomFx } from "@/room/private"
import { UpdateMessagesFxParams } from "./types"
import { messagesDomain } from "./domain"

export const updateMessagesFx = messagesDomain
    .effect<UpdateMessagesFxParams, MessageResponse, Error>()

// Race ellimination
export const setMessages = guard({
    source: sample(
        $currentRoomId,
        [loadRoomFx.done, paginateRoomFx.done, updateMessagesFx.done],
        (
            currentRoomId,
            { 
                params: { roomId },
                result,
            }) => ({
            currentRoomId,
            roomId,
            ...result,
        })
    ),
    filter: ({ currentRoomId, roomId }) => currentRoomId === roomId
})
