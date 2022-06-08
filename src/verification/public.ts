import { verificationDomain } from "./domain"
import { 
    MyVerificationRequest, 
    SetDeviceVerifiedFx 
} from "./types"

export const setDeviceVerifiedFx = verificationDomain
    .effect<SetDeviceVerifiedFx, void, Error>()

export const cancelVerificationEventFx = verificationDomain
    .effect<MyVerificationRequest, MyVerificationRequest, Error>()

type DeviceIsVerifired = boolean

export const setMyDeviceVerifiedFx = verificationDomain
    .effect<void, DeviceIsVerifired, Error>()

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

export const checkDeviceVerificationFx = verificationDomain
    .effect<void, void, Error>()

export const $deviceIsVerifired = verificationDomain
    .store<DeviceIsVerifired | null>(null)

export const startMyDeviceVerificationFx = verificationDomain
    .effect<void, void, Error>()
