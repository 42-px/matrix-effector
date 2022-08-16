import { 
    VerificationRequest, 
    IVerificationChannel, 
    ISecretStorageKeyInfo 
} from "matrix-js-sdk"

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

export type CheckRecoveryKeyParams = Pick<InputToKeyParams, "recoveryKey">
export type CheckPassphrase = Pick<InputToKeyParams, "passphrase">

export type CheckRecoveryKeyFxParams = CheckRecoveryKeyParams & {
  resolveAndReject: SecretStorageKeyResolveAndReject
}

export type CheckPassphraseFxParams = CheckPassphrase & {
  resolveAndReject: SecretStorageKeyResolveAndReject
}

export type SavedInputToKeyMethod = (
  params: InputToKeyParams
) => Promise<Uint8Array>


export type CheckCanVerifyFxParams = {
  profileId: string
}

export type SecretStorageKeyResolveAndReject = {
  resolve:(input: InputToKeyParams) => void
  reject: () => void
} 
