import { IRecoveryKey } from "matrix-js-sdk"

import { SecureBackupSetupMethod } from "@/types"

import { d } from "./domain"

export const createRecoveryKeyAndPassPhraseFx = d
    .effect<string | undefined, IRecoveryKey, Error>()

export const getSecureBackupSetupMethodsFx = d
    .effect<void, SecureBackupSetupMethod[], Error>()

export const onNeedCreateRecoveryMethod = d.event<void>()

export const lossAllRecoveryKeyMethod = d.event<void>()

export const cancelCreateNewMethod = d.event<void>()
export const onNewRecoveryMethodCreated = d.event<void>()

export const bootstrapSecretStorageFx = d.effect<IRecoveryKey, void, Error>()

export const resetAllRecoveryKeyMethodsFx = d.effect<void,void, Error>()

export const setupRecoveryMethodFx = d.effect<void, void, Error>()
