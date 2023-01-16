export type DetailedKeyBackupInfo = {
    backupKeyStored: boolean
    backupKeyCached: boolean
    backupKeyWellFormed: boolean
    secretStorageKeyInAccount: boolean
    secretStorageReady: boolean
}

export type OnBackupKeyLoadProgress = {
    stage: "fetch"
    successes: undefined
    failures: undefined
    total: undefined
} | {
    stage: "load_keys"
    successes: number
    failures: number
    total: number
}
