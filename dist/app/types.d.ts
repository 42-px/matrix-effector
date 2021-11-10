import { CreateClientOption, MatrixClient } from "matrix-js-sdk";
export { LoginPayload } from "matrix-js-sdk";
export interface LoginByPasswordParams {
    user: string;
    password: string;
}
export interface LoginByTokenParams {
    token: string;
    baseUrl: string;
}
export declare type StartClientParams = Parameters<MatrixClient["startClient"]>[0];
export declare type AuthData = {
    userId: string;
    deviceId: string;
    accessToken: string;
    wellKnown?: string;
};
export declare type PrependAndCreateClientParams = {
    prependParams: CreateClientOption & {
        messageBatchInterval?: number;
    };
    createClientParams: StartClientParams;
};
