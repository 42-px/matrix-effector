import { combine, forward, guard } from "effector"
import matrix, { Direction } from "matrix-js-sdk"
import {
    $currentRoomId,
    $loadRoomFxPending,
    loadRoom
} from "@/room"
import { $loadFilter } from "@/room/private"
import { setMessages } from "@/room-messages/private"
import { getMessages } from "@/utils"
import {
    paginateBackwardFx,
    paginateForwardFx,
    paginateRoomFx
} from "./private"
import {
    $canPaginateBackward,
    $canPaginateForward,
    $paginateBackwardPending,
    $paginateForwardPending,
    onPaginateBackwardDone,
    onPaginateForwardDone,
    paginateBackward,
    paginateForward
} from "./public"
import { TimelineWindowUndefined } from "@/errors"

const $paginateFilter = combine(
    $loadFilter,
    $paginateBackwardPending,
    $paginateForwardPending,
    $loadRoomFxPending,
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

$paginateBackwardPending
    .on(paginateBackwardFx.pending, (_, value) => value)
    .reset($currentRoomId)
$paginateForwardPending
    .on(paginateForwardFx.pending, (_, value) => value)
    .reset($currentRoomId)
$canPaginateBackward
    .on(setMessages, (_, { canPaginateBackward }) => canPaginateBackward)
    .reset([loadRoom, $currentRoomId])
$canPaginateForward
    .on(setMessages, (_, { canPaginateForward }) => canPaginateForward)
    .reset([loadRoom, $currentRoomId])

forward({
    from: paginateBackwardFx.done,
    to: onPaginateBackwardDone,
})

forward({
    from: paginateForwardFx.done,
    to: onPaginateForwardDone,
})

guard({
    source: paginateBackward,
    filter: $paginateFilter,
    target: paginateBackwardFx
})
guard({
    source: paginateForward,
    filter: $paginateFilter,
    target: paginateForwardFx
})

paginateRoomFx.use(async ({
    timelineWindow,
    direction,
    size,
    makeRequest,
    requestLimit,
}) => {
    if (!timelineWindow) throw new TimelineWindowUndefined()
    const dir = direction === "forward" ?
        matrix.EventTimeline.FORWARDS :
        matrix.EventTimeline.BACKWARDS
    await timelineWindow
        .paginate(dir, size, makeRequest, requestLimit)
    const canPaginateForward = timelineWindow.canPaginate(Direction.Forward)
    const messages = getMessages(timelineWindow)
    return {
        messages,
        isLive: !canPaginateForward,
        canPaginateForward: canPaginateForward,
        canPaginateBackward: timelineWindow.canPaginate(Direction.Backward)
    }
})
