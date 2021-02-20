import { batchEvents } from "@42px/effector-extra"
import { throttle } from "patronum/throttle"
import { matrixDomain } from "./domain"
import { MappedRoom, MessageEvent } from "./types"

export const roomMessage = matrixDomain.event<MessageEvent>()
export const createRoomMessageBatch = (ms: number) =>
    batchEvents(roomMessage, ms)
export const onInitialSync = matrixDomain.event<MappedRoom[]>()
export const onCachedState = matrixDomain.event<MappedRoom[]>()
export const onSync = matrixDomain.event<MappedRoom[]>()
export const createOnSyncThrottled = (ms: number) =>
    throttle({ source: onSync, timeout: ms})
