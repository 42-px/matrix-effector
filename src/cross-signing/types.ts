import { SecureBackupSetupMethod } from "@/types"

export type ConfirmResetCrossSigningFxResult = {
    result: boolean
}

export interface IE2EEWellKnown {
    default?: boolean
    secure_backup_required?: boolean
    secure_backup_setup_methods?: SecureBackupSetupMethod[]
}
