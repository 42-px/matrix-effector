import {
    VerificationRequest,
} from "matrix-js-sdk/lib/crypto/verification/request/VerificationRequest"


export type SetDeviceVerifiedFx = {
  userId: string
  deviceId: string
} 

export type CurrentVerificationRequest = {
  challenge: string
  cancelPromise: Promise<VerificationRequest>
  accept: (challengeMatches: boolean) => void
  cancel: () => void
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
