import { MatrixClient } from "matrix-js-sdk";
import { createClientOptions } from "@/types";
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
export declare type CreateClientParams = {
    createClientParams: createClientOptions;
    startClientParams: StartClientParams;
};
