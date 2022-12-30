import { d } from "./domain"
import { ConfirmResetCrossSigningFxResult } from "./types"

export const confirmResetCrossSigningFx = d
    .effect<void, ConfirmResetCrossSigningFxResult, Error>()

export const $crossSigningId = d.store<string|null>(null)

export const onCrossSigningKeyChange = d.event<void>()
export const crossSigningChangeFx = d.effect<void, void, Error>()
