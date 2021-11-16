import { MatrixClient } from "matrix-js-sdk"
import { CreateClientOptions } from "@/types";

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
