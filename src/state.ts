import { TimelineWindow } from "matrix-js-sdk"
import { matrixDomain } from "./domain"
import { loadRoomFx } from "./effects"
import { Message, RoomWithActivity } from "./types"

export const $currentRoomId = matrixDomain
    .store<RoomWithActivity["roomId"] | null>(null)
export const $timelineWindow = matrixDomain.store<TimelineWindow | null>(null)
export const $messages = matrixDomain.store<Message[]>([])
export const $loadRoomFxPending = loadRoomFx.pending
export const $paginateForwardPending = matrixDomain.store(false)
export const $paginateBackwardPending = matrixDomain.store(false)
export const $isLive = matrixDomain.store<boolean | null>(null)
export const $eventsRetrieved = matrixDomain.store<boolean | null>(null)
