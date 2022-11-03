import { createApi } from "effector"
import { IRecoveryKey } from "matrix-js-sdk/lib"
import { verificationDomain } from "./domain"
import {
    CheckCanVerifyFxParams,
    ResolvePassphrase,
    ResolveRecoveryKeyParams,
    MyVerificationRequest,
    SavedInputToKeyMethod,
    SecretStorageKeyResolveAndReject,
    StartVerificationDeviceParams,
    CheckKeyInfo,
} from "./types"

type DeviceIsVerified = boolean

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

export const onVerificationRequest = verificationDomain
    .event<MyVerificationRequest>()

export const startSASVerification = verificationDomain
    .event<void>()

export const confirmSASVerification = verificationDomain
    .event<void>()

export const startVerificationDevice = verificationDomain
    .event<StartVerificationDeviceParams>()

export const startThisDeviceVerificationFx = verificationDomain
    .effect<void, void, Error>()

type UserId = string

export const startVerificationUser = verificationDomain
    .event<UserId>()

export const onRequestAccept = verificationDomain
    .event<MyVerificationRequest>()

export const onRequestCancel = verificationDomain
    .event<MyVerificationRequest>()

export const cancelAllRequests = verificationDomain
    .event<void>()


// Recovery Key
export const resolveRecoveryKey = verificationDomain
    .event<ResolveRecoveryKeyParams>()

export const createRecoveryKeyAndPassPhraseFx = verificationDomain
    .effect<string | undefined, IRecoveryKey, Error>()

export const saveInputToKeyMethod = verificationDomain
    .event<SavedInputToKeyMethod>()

export const setSecretStoragePromise = verificationDomain
    .event<SecretStorageKeyResolveAndReject>()

export const onNeedRecoveryKeyOrPassphrase = verificationDomain
    .event<void>()

export const startRecoveryKeyOrPassphraseVerification = verificationDomain
    .event<void>()

export const setCheckKeyInfo = verificationDomain
    .event<CheckKeyInfo>()

export const onCheckSecretStorageKey = verificationDomain.event<string>()

export const onRecoveryKeyOrPassphraseSuccess = verificationDomain.event<void>()

export const onValidRecoveryKey = verificationDomain.event<void>()
export const onInvalidRecoveryKey = verificationDomain.event<Error>()

// passphrasse verification 

export const resolvePassphrase = verificationDomain
    .event<ResolvePassphrase>()

export const $hasPassphrase = verificationDomain.store<boolean>(false)
export const onHasPassphrase = verificationDomain.event<boolean>()

// others
export const $deviceIsVerified = verificationDomain
    .store<DeviceIsVerified | null>(null)

export const onUpdateDeviceList = verificationDomain
    .event<string[]>()

export const checkThisDeviceVerificationFx = verificationDomain
    .effect<void, boolean, Error>()

export const checkCanVerifyFx = verificationDomain
    .effect<CheckCanVerifyFxParams, boolean, Error>()

export const onUsersProfileUpdate = verificationDomain
    .event<UserId[]>()
