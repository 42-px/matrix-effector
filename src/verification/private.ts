import { verificationDomain } from "./domain"
import { 
    MyVerificationRequest, 
    OnVerificationRequestFxParams, 
    StartVerificationDeviceParams, 
    CheckKeyInfo,
    ValidatePassphraseFxParams,
    ValidateRecoveryKeyFxParams,
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

export const restoreKeyBackupFx = verificationDomain
    .effect<void, void, Error>()

export const $checkKeyInfo = verificationDomain
    .store<CheckKeyInfo | null>(null)

export const validateRecoveryKeyFx = verificationDomain
    .effect<ValidateRecoveryKeyFxParams, boolean, Error>()

// others
export const updateDeviceVerification = verificationDomain
    .event<boolean>()

export const validatePassphraseFx = verificationDomain
    .effect<ValidatePassphraseFxParams, boolean, Error>()

export const checkCanVerifyFx = verificationDomain
    .effect<void, boolean, Error>()
