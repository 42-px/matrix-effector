import { cryptoDomain } from "./domain"
import { 
    ExportE2ERoomsKeysFxParams, 
    importE2ERoomsKeysFxParams
} from "./types"

export const $isKeyBackupEnabled = cryptoDomain
    .store<boolean | null>(null)

export const checkBackupKeyFx = cryptoDomain
    .effect<void, boolean | null, Error>() 

export const initCryptoFx = cryptoDomain
    .effect<void, void, Error>()

export const onCrossSigningKeyChange = cryptoDomain
    .event<void>()

export const $isCryptoEnabled = cryptoDomain.store<boolean | null>(null)

export const $identityKey = cryptoDomain.store<string|null>(null)

export const exportE2ERoomsKeysFx = cryptoDomain
    .effect<ExportE2ERoomsKeysFxParams, ArrayBuffer, Error>()

export const importE2ERoomsKeysFx = cryptoDomain
    .effect<importE2ERoomsKeysFxParams, void, Error>()
