import { CreateClientOption, MatrixClient } from "matrix-js-sdk";
import { EventListener } from "./types";
export declare const client: () => MatrixClient;
export declare const prependClientParams: (opts: string | CreateClientOption) => void;
export declare const onClientEvent: (callbacks: EventListener[]) => void;
