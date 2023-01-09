import { cryptoDomain } from "./domain"

export const $isKeyBackupEnabled = cryptoDomain
    .store<boolean | null>(null)

export const checkBackupKeyFx = cryptoDomain
    .effect<void, boolean | null, Error>() 

export const initCryptoFx = cryptoDomain
    .effect<void, void, Error>()

export const onCrossSigningKeyChange = cryptoDomain
    .event<void>()

export const $isCryptoEnabled = cryptoDomain.store<boolean | null>(null)
