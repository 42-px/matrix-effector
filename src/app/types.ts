import { 
    IContent, 
    IVerificationChannel, 
    MatrixClient, 
    VerificationRequest
} from "matrix-js-sdk"
import { CreateClientOptions } from "@/types"

export interface LoginByPasswordParams {
    user: string
    password: string
}
export interface LoginByTokenParams {
    token: string
    baseUrl: string
}
export type StartClientParams = Parameters<MatrixClient["startClient"]>[0]

export type AuthData = {
    userId: string
    deviceId: string
    accessToken: string
    wellKnown?: string
}

export type CreateClientParams = {
    createClientParams: CreateClientOptions
    startClientParams: StartClientParams
}

export type StateEventsContent = IContent & {
    isDirect?: boolean
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
