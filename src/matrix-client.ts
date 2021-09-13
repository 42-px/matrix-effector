import { batchEvents } from "@42px/effector-extra"
import matrix, { CreateClientOption, MatrixClient } from "matrix-js-sdk"
import { roomMessage } from "./public"
import { EventListener } from "./types"

let clientStore: MatrixClient
let options: Parameters<typeof matrix.createClient>[0]
let messageBatchInterval = 500
const callbacksStore: EventListener[] = []
export const client = (): MatrixClient => {
    if (!clientStore) {
        clientStore = matrix.createClient(options)
        callbacksStore.forEach(([eventName, cb]) => {
            clientStore.on(eventName, cb)
        })
    }
    return clientStore
}
export const prependClientParams = (
    opts: string | CreateClientOption & {
        messageBatchInterval?: number
    }
): void => {
    if (typeof opts === "string") {
        options = opts
        return
    }
    const { messageBatchInterval: ms, ...restOpts} = opts
    options = restOpts
    if (ms !== undefined) messageBatchInterval = ms
}

export const onClientEvent = (callbacks: EventListener[]): void => {
    callbacksStore.push(...callbacks)
}

export const createRoomMessageBatch = () => {
    return batchEvents(roomMessage, messageBatchInterval)
}
