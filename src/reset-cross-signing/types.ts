import { AuthType, InteractiveAuth, IStageStatus } from "matrix-js-sdk"

export type SubmitAuthDictFxParams = {
    password: string
    interactiveAuth: InteractiveAuth
}
export type ConfirmResetCrossSigningFxResult = {
    result: boolean
}
export type OnInteractiveAuthStateUpdateResult = {
    nextStage: AuthType
    status: IStageStatus
}

export enum SecureBackupSetupMethod {
    Key = "key",
    Passphrase = "passphrase",
}
export interface IE2EEWellKnown {
    default?: boolean
    secure_backup_required?: boolean
    secure_backup_setup_methods?: SecureBackupSetupMethod[]
}
