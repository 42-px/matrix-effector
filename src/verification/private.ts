import { verificationDomain } from "./domain"
import { 
    MyVerificationRequest, 
    OnVerificationRequestFxParams, 
    StartVerificationDeviceParams 
} from "./types"


export const startSASFx = verificationDomain
    .effect<MyVerificationRequest, void, Error>()

export const confirmSASVerificationFx = verificationDomain
    .effect<MyVerificationRequest, void, Error>()

export const onCancelVerificationEvent = verificationDomain
    .event<MyVerificationRequest>()

export const updateVerificationPhase = verificationDomain
    .event<void>()

export const updateDeviceVerification = verificationDomain
    .event<boolean>()

export const onVerificationRequestFx = verificationDomain
    .effect<OnVerificationRequestFxParams, MyVerificationRequest, Error>()

export const startVerificationDeviceFx = verificationDomain
    .effect<StartVerificationDeviceParams, MyVerificationRequest, Error>()

type UserId = string


export const startVerificationUserFx = verificationDomain
    .effect<UserId, MyVerificationRequest, Error>()

export const requestAcceptFx = verificationDomain
    .effect<MyVerificationRequest, void, Error>()

