import { TimelineWindow } from "matrix-js-sdk"
import { matrixDomain } from "./domain"
import { loadRoomFx, paginateRoomFx } from "./effects"
import { Message, RoomWithActivity } from "./types"

export const $roomId = matrixDomain
    .store<RoomWithActivity["roomId"] | null>(null)
export const $timelineWindow = matrixDomain.store<TimelineWindow | null>(null)
export const $messages = matrixDomain.store<Message[]>([])
export const $loadRoomFxPending = loadRoomFx.pending
export const $paginateRoomFxPending = paginateRoomFx.pending
