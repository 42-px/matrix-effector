import { IRecoveryKey } from "matrix-js-sdk"

import { d } from "./domain"
import { 
    ConfirmResetCrossSigningFxResult, 
    OnInteractiveAuthStateUpdateResult,
    SecureBackupSetupMethod
} from "./types"

export const confirmResetCrossSigningFx = d
    .effect<void, ConfirmResetCrossSigningFxResult, Error>()

export const submitAuthDict = d.event<string>()

export const onNeedUserPassword = d.event<void>()
export const onUserPasswordError = d.event<string>()
export const onUserPasswordSuccess = d.event<void>()

export const onInteractiveAuthBusyChange = d.event<boolean>()
export const onInteractiveAuthStateUpdate = d
    .event<OnInteractiveAuthStateUpdateResult>()

export const getSecureBackupSetupMethodsFx = d
    .effect<void, SecureBackupSetupMethod[], Error>()

export const onNeedCreateRecoveryMethod = d.event<void>()

export const lossAllRecoveryKeyMethod = d.event<void>()

export const cancelCreateNewMethod = d.event<void>()
export const onNewRecoveryMethodCreated = d.event<void>()

export const bootstrapSecretStorageFx = d.effect<IRecoveryKey, void, Error>()
