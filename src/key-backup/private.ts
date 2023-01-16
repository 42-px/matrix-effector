import { d } from "./domain"
import { DetailedKeyBackupInfo } from "./types"

export const getDetailedKeyBackupInfoFx = d
    .effect<void, DetailedKeyBackupInfo, Error>()

export const deleteKeyBackupFx = d.effect<string, void, Error>()
