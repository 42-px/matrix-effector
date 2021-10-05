import { MatrixClient } from "matrix-js-sdk"

export { LoginPayload } from "matrix-js-sdk"

export interface LoginByPasswordParams {
    user: string
    password: string
}
export interface LoginByTokenParams {
    token: string
}
export type StartClientParams = Parameters<MatrixClient["startClient"]>[0]
