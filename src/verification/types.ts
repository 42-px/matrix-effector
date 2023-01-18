import { 
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

export type InputToKeyParams = {
  passphrase?: string
  recoveryKey?: string
}

export type CheckKeyInfo = {
  keyInfo: ISecretStorageKeyInfo
}

export type ValidatePassphraseFxParams = CheckKeyInfo & { passphrase: string }
export type ValidateRecoveryKeyFxParams = CheckKeyInfo & { input: string }