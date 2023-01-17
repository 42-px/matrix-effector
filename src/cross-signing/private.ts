import { d } from "./domain"

import { CrossSigningStatus } from "./types"

export const getCrossSigningIdFx = d.effect<void, string, Error>()

export const getCrossSigningStatusFx = d
    .effect<void, CrossSigningStatus, Error>()
