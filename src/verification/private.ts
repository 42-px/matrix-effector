import { verificationDomain } from "./domain"
import { MyVerificationRequest, OnVerificationRequestFxParams } from "./types"


export const startSASFx = verificationDomain
    .effect<MyVerificationRequest, void, Error>()

export const confirmSASVerificationFx = verificationDomain
    .effect<MyVerificationRequest, void, Error>()

export const cancelVerificationEvent = verificationDomain
    .event<MyVerificationRequest>()

export const updateVerificationPhase = verificationDomain
    .event<void>()

export const updateDeviceVerification = verificationDomain
    .event<boolean>()

export const onVerificationRequestFx = verificationDomain
    .effect<OnVerificationRequestFxParams, MyVerificationRequest, Error>()
