import { 
    VerificationRequest 
} from "matrix-js-sdk/lib/crypto/verification/request/VerificationRequest"
import { cryptoDomain } from "./domain"
import { SetDeviceVerifiedFx } from "./types"

type DeviceIsVerifired = boolean

export const $deviceIsVerifired = cryptoDomain
    .store<DeviceIsVerifired | null>(null)

export const checkBackupKeyFx = cryptoDomain
    .effect<void, boolean | null, Error>() 

export const initCryptoFx = cryptoDomain
    .effect<void, void, Error>()

export const setDeviceVerifiedFx = cryptoDomain
    .effect<SetDeviceVerifiedFx, void, Error>()

export const setMyDeviceVerifiedFx = cryptoDomain
    .effect<void, DeviceIsVerifired, Error>()

export const $currentVerificationEvent = cryptoDomain
    .store<VerificationRequest | null>(null)

export const setCurrentVerificationEvent = cryptoDomain
    .event<VerificationRequest>()

export const $verificationEvents = cryptoDomain
    .store<VerificationRequest[]>([])

export const onVerificationRequestFx = cryptoDomain
    .effect<VerificationRequest, VerificationRequest, Error>()

export const updateDeviceVerification = cryptoDomain
    .event<boolean>()
