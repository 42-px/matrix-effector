import { matrixDomain } from "./domain"
import {
    LoadRoomFxParams,
    MessageResponse,
    PaginateRoomFxParams
} from "./types"

export const loadRoomFx = matrixDomain
    .effect<LoadRoomFxParams, MessageResponse, Error>()
export const paginateRoomFx = matrixDomain
    .effect<PaginateRoomFxParams, MessageResponse, Error>()
