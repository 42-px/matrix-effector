import { paginationDomain } from "./domain"
import { PaginateParams } from "./types"

export const $paginateForwardPending = paginationDomain.store(false)
export const $paginateBackwardPending = paginationDomain.store(false)
export const $canPaginateBackward = paginationDomain.store(true)
export const $canPaginateForward = paginationDomain.store(true)

export const onPaginateBackwardDone = paginationDomain.event<void>()
export const onPaginateForwardDone = paginationDomain.event<void>()
export const paginateForward = paginationDomain.event<PaginateParams>()
export const paginateBackward = paginationDomain.event<PaginateParams>()
