import matrix, { MatrixClient } from "matrix-js-sdk";
import { EventListener } from "./types";
export declare const createClient: (options?: (string & {
    messageBatchInterval?: number | undefined;
}) | (matrix.CreateClientOption & {
    messageBatchInterval?: number | undefined;
}) | undefined) => void;
export declare const client: () => MatrixClient;
export declare const onClientEvent: (callbacks: EventListener[]) => void;
export declare const createRoomMessageBatch: () => import("effector").Event<import("./types").Message[]>;
