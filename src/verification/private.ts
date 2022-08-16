import { verificationDomain } from "./domain"
import { 
    CheckPassphraseFxParams,
    CheckRecoveryKeyFxParams,
    MyVerificationRequest, 
    OnVerificationRequestFxParams, 
    SavedInputToKeyMethod, 
    SecretStorageKeyResolveAndReject, 
    StartVerificationDeviceParams 
} from "./types"

// Emodji SAS Verification

export const startSASFx = verificationDomain
    .effect<MyVerificationRequest, void, Error>()

export const confirmSASVerificationFx = verificationDomain
    .effect<MyVerificationRequest, void, Error>()

export const onCancelVerificationEvent = verificationDomain
    .event<MyVerificationRequest>()

export const updateVerificationPhase = verificationDomain
    .event<void>()

export const onVerificationRequestFx = verificationDomain
    .effect<OnVerificationRequestFxParams, MyVerificationRequest, Error>()

export const startVerificationDeviceFx = verificationDomain
    .effect<StartVerificationDeviceParams, MyVerificationRequest, Error>()

type UserId = string

export const startVerificationUserFx = verificationDomain
    .effect<UserId, MyVerificationRequest, Error>()

export const requestAcceptFx = verificationDomain
    .effect<MyVerificationRequest, void, Error>()

export const cancelAllRequestsFx = verificationDomain
    .effect<MyVerificationRequest[], void, Error>()

export const cancelVerificationEventFx = verificationDomain
    .effect<MyVerificationRequest, MyVerificationRequest, Error>()

// Recovery key
export const checkRecoveryKeyFx = verificationDomain
    .effect<CheckRecoveryKeyFxParams, void, Error>()

export const $savedInputToKeyMethod = verificationDomain
    .store<SavedInputToKeyMethod | null>(null)

export const $secretStorageKeyResolveAndReject = verificationDomain
    .store<SecretStorageKeyResolveAndReject|null>(null)

export const restoreKeyBackupFx = verificationDomain
    .effect<void, void, Error>()

// passpharasse verification 
export const checkPassphraseFx = verificationDomain
    .effect<CheckPassphraseFxParams, void, Error>()

// others
export const updateDeviceVerification = verificationDomain
    .event<boolean>()
