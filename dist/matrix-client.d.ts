import { CreateClientOption, MatrixClient } from "matrix-js-sdk";
import { EventListener } from "./types";
declare let messageBatchInterval: number;
export declare const client: () => MatrixClient;
export declare const prependClientParams: (opts: string | (CreateClientOption & {
    messageBatchInterval?: number;
})) => void;
export declare const onClientEvent: (callbacks: EventListener[]) => void;
export declare const createRoomMessageBatch: () => import("effector").Event<import("./types").Message[]>;
export {};
