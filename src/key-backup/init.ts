import { forward, sample } from "effector"
import { IKeyBackupCheck } from "matrix-js-sdk/lib/crypto/backup"

import { client } from "@/matrix-client"
import { 
    destroyClientFx, 
    onSessionRemaining, 
    onUpdateKeyBackupStatus
} from "@/app"
import { accessSecretStorage } from "@/cryptoCallbacks"
import { initCryptoFx } from "@/crypto"

import { 
    $detailedKeyBackupInfo, 
    $isKeyBackupEnabled, 
    $keyBackupInfo, 
    $sessionsRemaining, 
    checkBackupEnabledKeyFx, 
    deleteKeyBackup, 
    getKeyBackupInfoFx, 
    newKeyBackupFx,
    onBackupKeyLoadProgress,
    resetCryptoStorageFx,
    restoreKeyBackupFx,
} from "./public"
import { 
    deleteKeyBackupFx,
    getDetailedKeyBackupInfoFx 
} from "./private"

$sessionsRemaining
    .on(onSessionRemaining, (_, remaining) => remaining)
    .reset(destroyClientFx.done)

$isKeyBackupEnabled
    .on(checkBackupEnabledKeyFx.doneData, (_, isEnabled) => isEnabled)
    .reset(destroyClientFx.done)

$keyBackupInfo
    .on(getKeyBackupInfoFx.doneData, (_, info) => info)
    .reset(destroyClientFx.done)

$detailedKeyBackupInfo
    .on(getDetailedKeyBackupInfoFx.doneData, (_, detailedInfo) => detailedInfo)
    .reset(destroyClientFx.done)

forward({
    from: initCryptoFx.doneData,
    to: checkBackupEnabledKeyFx,
})

forward({
    from: [
        onUpdateKeyBackupStatus, 
        resetCryptoStorageFx.finally,
        deleteKeyBackupFx.finally,
    ],
    to: [
        checkBackupEnabledKeyFx, 
        getKeyBackupInfoFx, 
        getDetailedKeyBackupInfoFx
    ]
})

sample({
    clock: deleteKeyBackup,
    source: $keyBackupInfo,
    filter: (
        keyInfo: IKeyBackupCheck | null
    ): keyInfo is IKeyBackupCheck => Boolean(keyInfo?.backupInfo.version),
    fn: (keyInfo: IKeyBackupCheck) => keyInfo.backupInfo.version as string,
    target:  deleteKeyBackupFx,
})

checkBackupEnabledKeyFx.use(() => {
    return client().getKeyBackupEnabled()
})

getKeyBackupInfoFx.use(() => {
    return client().checkKeyBackup()
})

newKeyBackupFx.use(async () => {
    let info: any
    const cl = client()
    try {
        const secureSecretStorage = await cl
            .doesServerSupportUnstableFeature("org.matrix.e2e_cross_signing")

        if (secureSecretStorage) {
            await accessSecretStorage(async () => {
                info = await cl.prepareKeyBackupVersion(
                    undefined /* random key */,
                    { secureSecretStorage: true },
                )
                info = await cl.createKeyBackupVersion(info)
            })
        } else {
            const keyBackupInfo = await cl.getKeyBackupVersion()
            if (keyBackupInfo) [
                info = await cl.createKeyBackupVersion(
                    keyBackupInfo,
                )
            ]
        }

        await cl.scheduleAllGroupSessionsForBackup()

    } catch (e) {
        // TODO: If creating a version succeeds, but backup fails, should we
        // delete the version, disable backup, or do nothing?  If we just
        // disable without deleting, we'll enable on next app reload since
        // it is trusted.
        if (info) {
            cl.deleteKeyBackupVersion(info.version)
        }
    }
})

getDetailedKeyBackupInfoFx.use(async () => {
    const cl = client()
    const secretStorage = cl.crypto.secretStorage

    const backupKeyStored = !!(await cl.isKeyBackupKeyStored())
    const backupKeyFromCache = await cl.crypto.getSessionBackupPrivateKey()
    const backupKeyCached = !!(backupKeyFromCache)
    const backupKeyWellFormed = backupKeyFromCache instanceof Uint8Array
    const secretStorageKeyInAccount = await secretStorage.hasKey()
    const secretStorageReady = await cl.isSecretStorageReady()

    return {
        backupKeyStored,
        backupKeyCached,
        backupKeyWellFormed,
        secretStorageKeyInAccount,
        secretStorageReady
    }
})

deleteKeyBackupFx.use((version) => {
    const cl = client()
    return cl.deleteKeyBackupVersion(version)
})

restoreKeyBackupFx.use(async () => {
    const cl = client()
    const backupInfo = await cl.getKeyBackupVersion()
    const has4S = await cl.hasSecretStorageKey()
    const backupKeyStored = has4S && (await cl.isKeyBackupKeyStored())
    if (!backupInfo) return
    const progressCallback = {
        progressCallback: (e: any) => {
            onBackupKeyLoadProgress(e)
        }
    }
    try {
        const recoverInfo = await cl.restoreKeyBackupWithCache(
            undefined, /* targetRoomId */
            undefined, /* targetSessionId */
            backupInfo,
            // @TODO fix matrix-types
            progressCallback,
        )
        console.log("RestoreKeyBackupDialog: found cached backup key")
        return recoverInfo
    } catch (e) {
        console.error(e)
    }

    if (backupKeyStored) {
        await accessSecretStorage(async () => {
            await cl.restoreKeyBackupWithSecretStorage(
                backupInfo, undefined, undefined,
                // @TODO fix matrix-types
                progressCallback,
            )
        })
    }

}) 

resetCryptoStorageFx.use(async() => {
    await accessSecretStorage(async () => undefined, /* forceReset = */ true)
})
