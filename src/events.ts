import { batchEvents } from "@42px/effector-extra"
import { matrixDomain } from "./domain"
import { MappedRoom, MessageEvent } from "./types"

export const roomMessage = matrixDomain.event<MessageEvent>()
export const roomMessageBatch = batchEvents(roomMessage, 500)
export const onInitialSync = matrixDomain.event<MappedRoom[]>()
export const onCachedState = matrixDomain.event<MappedRoom[]>()
export const onSync = matrixDomain.event<MappedRoom[]>()
