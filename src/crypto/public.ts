import { cryptoDomain } from "./domain"
import { 
    ExportE2ERoomsKeysFxParams, 
    importE2ERoomsKeysFxParams
} from "./types"

export const initCryptoFx = cryptoDomain
    .effect<void, void, Error>()

export const $isCryptoEnabled = cryptoDomain.store<boolean | null>(null)

export const $identityKey = cryptoDomain.store<string|null>(null)

export const exportE2ERoomsKeysFx = cryptoDomain
    .effect<ExportE2ERoomsKeysFxParams, ArrayBuffer, Error>()

export const importE2ERoomsKeysFx = cryptoDomain
    .effect<importE2ERoomsKeysFxParams, void, Error>()

export const $sessionsRemaining = cryptoDomain.store<number | null>(null)
export const onSessionRemaining = cryptoDomain.event<number>()

export const $deviceEd25519Key = cryptoDomain.store<string|null>(null)
