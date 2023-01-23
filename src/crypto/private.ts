import { cryptoDomain } from "./domain"

export const getIdentityKeyFx = cryptoDomain
    .effect<void, string | null, Error>()

export const getDeviceEd25519KeyFx = cryptoDomain.effect<void, string, Error>()
