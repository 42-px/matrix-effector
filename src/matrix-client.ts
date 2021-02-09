import matrix, { CreateClientOption, MatrixClient } from "matrix-js-sdk"
import { EventListener } from "./types"

let clientStore: MatrixClient
let options: Parameters<typeof matrix.createClient>[0]
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
    opts: string | CreateClientOption
): void => {
    options = opts
}

export const onClientEvent = (callbacks: EventListener[]): void => {
    callbacksStore.push(...callbacks)
}
