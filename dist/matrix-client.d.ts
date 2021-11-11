import { MatrixClient } from "matrix-js-sdk";
import { createClientOptions, EventListener } from "./types";
export declare const createClient: ({ options, messageBatchInterval: ms }: createClientOptions) => void;
export declare const client: () => MatrixClient;
export declare const onClientEvent: (callbacks: EventListener[]) => void;
export declare const createRoomMessageBatch: () => import("effector").Event<import("./types").Message[]>;
export declare const destroyClient: () => void;
