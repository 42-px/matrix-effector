import { TimelineWindow } from "matrix-js-sdk"
import { attach } from "effector"
import { $currentRoomId, $timelineWindow, MessageResponse } from "@/room"
import { paginationDomain } from "./domain"
import { PaginateParams, PaginateRoomFxParams } from "./types"

export const paginateRoomFx = paginationDomain
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
