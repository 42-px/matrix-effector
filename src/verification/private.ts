import { verificationDomain } from "./domain"
import { 
    ResolvePassphraseFxParams,
    ResolveRecoveryKeyFxParams,
    MyVerificationRequest, 
    OnVerificationRequestFxParams, 
    SavedInputToKeyMethod, 
    SecretStorageKeyResolveAndReject, 
    StartVerificationDeviceParams, 
    CheckKeyInfo
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
export const resolveRecoveryKeyFx = verificationDomain
    .effect<ResolveRecoveryKeyFxParams, void, Error>()

export const $savedInputToKeyMethod = verificationDomain
    .store<SavedInputToKeyMethod | null>(null)

export const $secretStorageKeyResolveAndReject = verificationDomain
    .store<SecretStorageKeyResolveAndReject|null>(null)

export const restoreKeyBackupFx = verificationDomain
    .effect<void, void, Error>()

export const $checkKeyInfo = verificationDomain
    .store<CheckKeyInfo | null>(null)

export const checkSecretStorageKeyFx = verificationDomain
    .effect<CheckKeyInfo & { input: string }, boolean, Error>()

// passpharasse verification 
export const resolvePassphraseFx = verificationDomain
    .effect<ResolvePassphraseFxParams, void, Error>()

// others
export const updateDeviceVerification = verificationDomain
    .event<boolean>()
