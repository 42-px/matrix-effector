import { d } from "./domain"
import { ConfirmResetCrossSigningFxResult, CrossSigningStatus } from "./types"

export const confirmResetCrossSigningFx = d
    .effect<void, ConfirmResetCrossSigningFxResult, Error>()

export const $crossSigningId = d.store<string|null>(null)

export const onCrossSigningKeyChange = d.event<void>()
export const crossSigningChangeFx = d.effect<void, void, Error>()

export const $crossSigningStatus = d.store<CrossSigningStatus|null>(null)
export const onUpdateCrossSigningStatus = d.event<void>()
