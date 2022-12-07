import { d } from "./domain"
import { ConfirmResetCrossSigningFxResult } from "./types"

export const confirmResetCrossSigningFx = d
    .effect<void, ConfirmResetCrossSigningFxResult, Error>()

