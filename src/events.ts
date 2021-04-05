import { batchEvents } from "@42px/effector-extra"
import { throttle } from "patronum/throttle"
import { matrixDomain } from "./domain"
import {
    InitRoomParams,
    LoadRoomParams,
    MappedRoom,
    MessageEvent,
    PaginateParams
} from "./types"

export const roomMessage = matrixDomain.event<MessageEvent>()
export const createRoomMessageBatch = (ms: number) =>
    batchEvents(roomMessage, ms)
export const onInitialSync = matrixDomain.event<MappedRoom[]>()
export const onCachedState = matrixDomain.event<MappedRoom[]>()
export const onSync = matrixDomain.event<MappedRoom[]>()
export const createOnSyncThrottled = (ms: number) =>
    throttle({ source: onSync, timeout: ms})

export const initRoom = matrixDomain.event<InitRoomParams>()
export const loadRoom = matrixDomain.event<LoadRoomParams>()
export const paginateFront = matrixDomain.event<PaginateParams>()
export const paginateBack = matrixDomain.event<PaginateParams>()
