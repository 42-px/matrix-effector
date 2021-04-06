import { combine } from "effector"
import { loadRoomFx } from "./effects"
import {
    $paginateBackwardPending,
    $paginateForwardPending,
    $currentRoomId,
    $timelineWindow
} from "./state"

export const $canLoad = combine(
    $currentRoomId,
    $timelineWindow,
    (roomId, timelineWindow) => Boolean(roomId) && Boolean(timelineWindow)
)

export const $canPaginate = combine(
    $canLoad,
    $paginateBackwardPending,
    $paginateForwardPending,
    loadRoomFx.pending,
    (
        canLoad,
        backwardPaginationPending,
        forwardPaginationPending,
        roomLoading,
    ) => canLoad
    && !backwardPaginationPending
    && !forwardPaginationPending
    && !roomLoading
)
