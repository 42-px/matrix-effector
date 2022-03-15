import { TimelineWindow } from "matrix-js-sdk"
import { attach, guard, sample} from "effector"
import {
    $currentRoomId,
    $timelineWindow,
    loadRoomFx,
    MessageResponse
} from "@/room"
import {
    UpdateMessagesFxParams,
    PaginateParams,
    PaginateRoomFxParams
} from "./types"
import { messagesDomain } from "./domain"

export const paginateRoomFx = messagesDomain
    .effect<PaginateRoomFxParams, MessageResponse, Error>()

export const paginateBackwardFx = attach({
    source: [$currentRoomId, $timelineWindow],
    effect: paginateRoomFx,
    mapParams: (params: PaginateParams, [roomId, timelineWindow]) => ({
        roomId: roomId as string,
        timelineWindow: timelineWindow as TimelineWindow,
        direction: "backward" as const,
        ...params,
    })
})
    
export const paginateForwardFx = attach({
    source: [$currentRoomId, $timelineWindow],
    effect: paginateRoomFx,
    mapParams: (params: PaginateParams, [roomId, timelineWindow]) => ({
        roomId: roomId as string,
        timelineWindow: timelineWindow as TimelineWindow,
        direction: "forward" as const,
        ...params,
    })
})

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

export const updateCurrentRoomUnreadMessageCountFx = messagesDomain
    .effect<string, number, Error>()
