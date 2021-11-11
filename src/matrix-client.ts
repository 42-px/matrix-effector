import { batchEvents } from "@42px/effector-extra"
import matrix, { CreateClientOption, MatrixClient } from "matrix-js-sdk"
import { roomMessage } from "./room-messages"
import { EventListener } from "./types"

let clientStore: MatrixClient
let messageBatchInterval = 500
const callbacksStore: EventListener[] = []

export type createClientOptions = {
    options: CreateClientOption
    messageBatchInterval?: number
}

export const createClient = (
    {options, messageBatchInterval: ms}: createClientOptions
): void => {
    destroyClient()
    if (ms !== undefined) messageBatchInterval = ms
    clientStore = matrix.createClient(options)
    callbacksStore.forEach(([eventName, cb]) => {
        clientStore.on(eventName, cb)
    })
}
export const client = (): MatrixClient => clientStore

export const onClientEvent = (callbacks: EventListener[]): void => {
    callbacksStore.push(...callbacks)
}

export const createRoomMessageBatch = () => {
    return batchEvents(roomMessage, messageBatchInterval)
}

export const destroyClient = () => {
    if (clientStore) {
        clientStore.removeAllListeners()
        clientStore = null as any
    }
}
