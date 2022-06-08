import { cryptoDomain } from "./domain"

export const checkBackupKeyFx = cryptoDomain
    .effect<void, boolean | null, Error>() 

export const initCryptoFx = cryptoDomain
    .effect<void, void, Error>()
