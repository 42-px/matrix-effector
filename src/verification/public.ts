import { verificationDomain } from "./domain"
import { 
    MyVerificationRequest, 
    StartVerificationDeviceParams, 
} from "./types"

type DeviceIsVerified = boolean

export const $currentVerificationEvent = verificationDomain
    .store<MyVerificationRequest[]>([])

export const setCurrentVerificationEvent = verificationDomain
    .event<MyVerificationRequest>()

export const cancelVerificationEventFx = verificationDomain
    .effect<MyVerificationRequest, MyVerificationRequest, Error>()


export const $verificationEvents = verificationDomain
    .store<MyVerificationRequest[]>([])

export const onVerificationRequest = verificationDomain
    .event<MyVerificationRequest>()

export const startSASVerification = verificationDomain
    .event<void>()

export const confirmSASVerification = verificationDomain
    .event<void>()


export const $deviceIsVerified = verificationDomain
    .store<DeviceIsVerified | null>(null)

export const onUpdateDeviceList = verificationDomain
    .event<string[]>()

export const checkMyDeviceVerificationFx = verificationDomain
    .effect<void, boolean, Error>()


export const startVerificationDevice = verificationDomain
    .event<StartVerificationDeviceParams>()

export const startMyDeviceVerificationFx = verificationDomain
    .effect<void, void, Error>()

type UserId = string

export const startVerificationUser = verificationDomain
    .event<UserId>()

export const onRequestAccept = verificationDomain
    .event<MyVerificationRequest>()

export const onRequestCancel = verificationDomain
    .event<MyVerificationRequest>()
