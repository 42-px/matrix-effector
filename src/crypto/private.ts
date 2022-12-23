import { cryptoDomain } from "./domain"

export const crossSigningChangeFx = cryptoDomain
    .effect<void, void, Error>()

export const setEnableCrypto = cryptoDomain.event<boolean>()

export const getIdentityKeyFx = cryptoDomain
    .effect<void, string | null, Error>()
