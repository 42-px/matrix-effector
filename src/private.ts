import { TimelineWindow } from "matrix-js-sdk"
import { matrixDomain } from "./domain"
import {
    InitRoomParams,
    LoadRoomFxParams,
    MessageResponse,
    PaginateRoomFxParams
} from "./types"

export const initRoomFx = matrixDomain
    .effect<InitRoomParams, TimelineWindow, Error>()
export const loadRoomFx = matrixDomain
    .effect<LoadRoomFxParams, MessageResponse, Error>()
export const paginateRoomFx = matrixDomain
    .effect<PaginateRoomFxParams, MessageResponse, Error>()
