import { batchEvents } from "@42px/effector-extra"
import matrix, { MatrixClient } from "matrix-js-sdk"
import { roomMessage } from "./room-messages"
import {
    CreateClientOptions,
    EventListener
} from "./types"

let clientStore: MatrixClient
let messageBatchInterval = 500
const callbacksStore: EventListener[] = []

export const destroyClient = () => {
    if (clientStore) {
        clientStore.removeAllListeners()
        clientStore = null as any
    }
}

export const createClient = (
    {options, messageBatchInterval: ms}: CreateClientOptions
): void => {
    destroyClient()
    if (ms !== undefined) messageBatchInterval = ms
    clientStore = matrix.createClient(options)
    callbacksStore.forEach(([eventName, cb]) => {
        clientStore.on(eventName as any, cb)
    })
}
export const client = (): MatrixClient => clientStore

export const onClientEvent = (callbacks: EventListener[]): void => {
    callbacksStore.push(...callbacks)
}

export const createRoomMessageBatch = () => {
    return batchEvents(roomMessage, messageBatchInterval)
}
