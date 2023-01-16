import { d } from "./domain"
import { RenameDeviceParams, SessionInfo } from "./types"

export const updateDisplayNameFx = d.effect<string, void, Error>()
export const updateAvatarUrlFx = d.effect<string, void, Error>()

export const $mySessionsInfo = d.store<SessionInfo[] | null>(null)
export const getMySessionsFx = d.effect<void, SessionInfo[], Error>()
export const clearMySessionsInfo = d.event<void>()

export const logoutSessionsById = d.event<SessionInfo["device_id"][]>()

export const renameDeviceFx = d.effect<RenameDeviceParams, void, Error>()
