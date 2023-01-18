import { MatrixError } from "matrix-js-sdk"
import { IKeyBackupCheck } from "matrix-js-sdk/lib/crypto/backup"
import { IKeyBackupRestoreResult } from "matrix-js-sdk/lib/crypto/keybackup"

import { d } from "./domain"
import { DetailedKeyBackupInfo, OnBackupKeyLoadProgress } from "./types"

export const newKeyBackupFx = d.effect<void, void, Error>()

export const $keyBackupInfo = d.store<IKeyBackupCheck | null>(null)
export const getKeyBackupInfoFx = d
    .effect<void, IKeyBackupCheck, Error>()

export const $detailedKeyBackupInfo = d
    .store<DetailedKeyBackupInfo | null>(null)

export const onBackupKeyLoadProgress = d.event<OnBackupKeyLoadProgress>()

export const $isKeyBackupEnabled = d.store<boolean | null>(null)
export const checkBackupEnabledKeyFx = d.effect<void, boolean | null, Error>() 

export const deleteKeyBackup = d.event<void>()

export const restoreKeyBackupFx = d
    .effect<void, IKeyBackupRestoreResult | void, MatrixError>()

export const resetCryptoStorageFx = d.effect<void, void, Error>()

export const $sessionsRemaining = d.store<number | null>(null)
