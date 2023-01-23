import { createApi } from "effector"

import { 
    MyVerificationRequest,
    StartVerificationDeviceParams
} from "@/app"
import { UserId } from "@/types"

import { verificationDomain } from "./domain"
import {
    CheckKeyInfo,
    InputToKeyParams,
} from "./types"

// Emodji SAS Verification

export const $isWaitingAnotherUser = verificationDomain
    .store<boolean>(false)

export const {
    setWaitingAnotherUser,
    resetWaitingAnotherUser
} = createApi(
    $isWaitingAnotherUser,
    {
        setWaitingAnotherUser: () => true,
        resetWaitingAnotherUser: () => false
    }
)

export const $currentVerificationEvent = verificationDomain
    .store<MyVerificationRequest[]>([])

export const setCurrentVerificationEvent = verificationDomain
    .event<MyVerificationRequest>()

export const $verificationEvents = verificationDomain
    .store<MyVerificationRequest[]>([])

export const startSASVerification = verificationDomain
    .event<void>()

export const confirmSASVerification = verificationDomain
    .event<void>()

export const startVerificationDevice = verificationDomain
    .event<StartVerificationDeviceParams>()

export const startThisDeviceVerificationFx = verificationDomain
    .effect<void, void, Error>()

export const startVerificationUser = verificationDomain
    .event<UserId>()

export const onRequestAccept = verificationDomain
    .event<MyVerificationRequest>()

export const onRequestCancel = verificationDomain
    .event<MyVerificationRequest>()

export const cancelAllRequests = verificationDomain
    .event<void>()


// Recovery Key

export const keyVerificationFx = verificationDomain
    .effect<void, void, Error>()

export const onNeedRecoveryKeyOrPassphrase = verificationDomain
    .event<void>()

export const startRecoveryKeyOrPassphraseVerification = verificationDomain
    .event<void>()

export const setCheckKeyInfo = verificationDomain
    .event<CheckKeyInfo>()

export const validateRecoveryKey = verificationDomain.event<string>()

export const onRecoveryKeyOrPassphraseSuccess = verificationDomain.event<void>()

export const onValidRecoveryKey = verificationDomain.event<void>()
export const onInvalidRecoveryKey = verificationDomain.event<Error>()

// passphrasse verification 

export const $hasPassphrase = verificationDomain.store<boolean>(false)
export const onHasPassphrase = verificationDomain.event<boolean>()

export const validatePassphrase = verificationDomain.event<string>()
export const onValidPassphrase = verificationDomain.event<void>()
export const onInvalidPassphrase = verificationDomain.event<Error>()

// others
export const $canVerify = verificationDomain.store<boolean>(false)

type DeviceIsVerified = boolean

export const $deviceIsVerified = verificationDomain
    .store<DeviceIsVerified | null>(null)

export const checkThisDeviceVerificationFx = verificationDomain
    .effect<void, boolean, Error>()

export const onResolveSecretStorageKey = verificationDomain
    .event<InputToKeyParams>()

export const onRejectSecretStorageKey = verificationDomain
    .event<void>()

