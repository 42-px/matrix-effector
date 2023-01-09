import { 
    VerificationRequest, 
    IVerificationChannel, 
    ISecretStorageKeyInfo 
} from "matrix-js-sdk"

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
  id: number
}

export type StartVerificationDeviceParams = {
  userId: string
  deviceId: string
}

export type InputToKeyParams = {
  passphrase?: string
  recoveryKey?: string
}

export type CheckCanVerifyFxParams = {
  profileId: string
}

export type CheckKeyInfo = {
  keyInfo: ISecretStorageKeyInfo
}
