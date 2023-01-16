import { IMyDevice } from "matrix-js-sdk"

export type SessionInfo = IMyDevice & {
    isVerified: boolean
    isCurrentSession: boolean
}

export type RenameDeviceParams = {
    deviceId: string
    newDisplayName: string
}
