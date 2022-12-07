import { IAuthData } from "matrix-js-sdk"

import { d } from "./domain"
import { OnInteractiveAuthStateUpdateResult } from "./types"

export const createInteractiveAuthFx = d
    .effect<(auth: IAuthData) => Promise<IAuthData>, void, Error>()

export const submitAuthDict = d.event<string>()

export const onNeedUserPassword = d.event<void>()
export const onUserPasswordError = d.event<string>()
export const onUserPasswordSuccess = d.event<void>()

export const onInteractiveAuthBusyChange = d.event<boolean>()
export const onInteractiveAuthStateUpdate = d
    .event<OnInteractiveAuthStateUpdateResult>()
