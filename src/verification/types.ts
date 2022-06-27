import { 
    IVerificationChannel 
} from "matrix-js-sdk/lib/crypto/verification/request/Channel"
import {
    VerificationRequest 
} from "matrix-js-sdk/lib/crypto/verification/request/VerificationRequest"

export type SetDeviceVerifiedFx = {
  userId: string
  deviceId: string
} 

// When importing Phase from matrix-js-sdk, the build crashes because of cyclic dependencies
export enum Phase {
  Unsent = 1,
  Requested,
  Ready,
  Started,
  Cancelled,
  Done,
}

export type OnVerificationRequestFxParams = {
  request: MyVerificationRequest
  currentRequest: MyVerificationRequest | null
}

// eslint-disable-next-line max-len
export type MyVerificationRequest = VerificationRequest<IVerificationChannel> & {
  id: string
}

export type StartVerificationDeviceParams = {
  userId: string
  deviceId: string
}
