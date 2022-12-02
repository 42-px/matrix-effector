import { IAuthData, InteractiveAuth } from "matrix-js-sdk"

import { d } from "./domain"
import { SubmitAuthDictFxParams } from "./types"

export const $interactiveAuthInstance = d.store<InteractiveAuth | null>(null)

export const setInteractiveAuth = d.event<InteractiveAuth>()
export const submitAuthDictFx = d
    .effect<SubmitAuthDictFxParams, void, Error>()

export const resetAllRecoveryKeyMethodsFx = d.effect<void,void, Error>()

export const fetchBackupInfoFx = d.effect<void, void, Error>()

export const createInteractiveAuthFx = d
    .effect<(auth: IAuthData) => Promise<IAuthData>, void, Error>()
