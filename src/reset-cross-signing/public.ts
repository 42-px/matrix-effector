import { d } from "./domain"
import { 
    ConfirmResetCrossSigningFxResult, 
    OnInteractiveAuthStateUpdateResult 
} from "./types"

export const confirmResetCrossSigningFx = d
    .effect<void, ConfirmResetCrossSigningFxResult, Error>()


export const submitAuthDict = d.event<string>()

export const onNeedUserPassword = d.event<void>()
export const onUserPasswordError = d.event<string>()

export const onInteractiveAuthBusyChange = d.event<boolean>()
export const onInteractiveAuthStateUpdate = d
    .event<OnInteractiveAuthStateUpdateResult>()
