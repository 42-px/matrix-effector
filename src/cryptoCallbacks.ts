import {
    decodeRecoveryKey,
    deriveKey,
    DeviceTrustLevel,
    encodeBase64,
    encodeUnpaddedBase64,
    ICryptoCallbacks,
    ISecretStorageKeyInfo
} from "matrix-js-sdk"
import { client } from "@/matrix-client"
import { IdbLoad, IdbSave } from "./idbHelper"
import {
    InputToKeyParams,
    onHasPassphrase,
    setCheckKeyInfo,
    setSecretStorageKeyResolveAndReject,
} from "@/verification"

let secretStorageBeingAccessed = false
let secretStorageKeys: Record<string, Uint8Array> = {}
let secretStorageKeyInfo: Record<string, ISecretStorageKeyInfo> = {}

let dehydrationCache: {
    key?: Uint8Array
    keyInfo?: ISecretStorageKeyInfo
} = {}

function isCachingAllowed(): boolean {
    return secretStorageBeingAccessed
}

function cacheSecretStorageKey(
    keyId: string,
    keyInfo: ISecretStorageKeyInfo,
    key: Uint8Array,
): void {
    secretStorageKeys[keyId] = key
    secretStorageKeyInfo[keyId] = keyInfo
}

export async function promptForBackupPassphrase(): Promise<Uint8Array> {
    const key = new Uint8Array()

    console.log("promptForBackupPassphrase")
    // const success = await finished;
    // if (!success) throw new Error("Key backup prompt cancelled");

    return key
}

export async function accessSecretStorage(
    func = async () => { return },
    forceReset = false
): Promise<any> {
    const cl = client()
    secretStorageBeingAccessed = true
    try {

        // await cli.bootstrapCrossSigning({
        //     authUploadDeviceSigningKeys: async (makeRequest) => {
        //         const { finished } = Modal.createDialog(InteractiveAuthDialog, {
        //             title: _t("Setting up keys"),
        //             matrixClient: cli,
        //             makeRequest,
        //         })
        //         const [confirmed] = await finished
        //         if (!confirmed) {
        //             throw new Error("Cross-signing key upload auth canceled")
        //         }
        //     },
        // })
        await cl.bootstrapSecretStorage({
            getKeyBackupPassphrase: promptForBackupPassphrase,
        })

        // const keyId = Object.keys(secretStorageKeys)[0]
        // if (keyId && SettingsStore.getValue("feature_dehydration")) {
        //     let dehydrationKeyInfo = {}
        //     if (secretStorageKeyInfo[keyId] && secretStorageKeyInfo[keyId].passphrase) {
        //         dehydrationKeyInfo = { passphrase: secretStorageKeyInfo[keyId].passphrase }
        //     }
        //     console.log("Setting dehydration key")
        //     await cl.setDehydrationKey(secretStorageKeys[keyId], dehydrationKeyInfo, "Backup device")
        // } else if (!keyId) {
        //     console.warn("Not setting dehydration key: no SSSS key found")
        // } else {
        //     console.log("Not setting dehydration key: feature disabled")
        // }

        // `return await` needed here to ensure `finally` block runs after the
        // inner operation completes.
        return await func()
    } catch (e) {
        // SecurityCustomisations.catchAccessSecretStorageError?.(e)
        console.error(e)
        // Re-throw so that higher level logic can abort as needed
        throw e
    } finally {
        // Clear secret storage key cache now that work is complete
        secretStorageBeingAccessed = false
        if (!isCachingAllowed()) {
            secretStorageKeys = {}
            secretStorageKeyInfo = {}
        }
    }
}


function makeInputToKey(
    keyInfo: ISecretStorageKeyInfo,
): (params: InputToKeyParams) => Promise<Uint8Array> {
    return async (params) => {
        console.log(params)
        if (params.passphrase) {
            return deriveKey(
                params.passphrase,
                keyInfo.passphrase.salt,
                keyInfo.passphrase.iterations,
            )
        } else if (params.recoveryKey) {
            return decodeRecoveryKey(params.recoveryKey)
        }
        throw new Error("Invalid recoveryKey or passphrase")
    }
}

async function getSecretStorageKey(
    { keys: keyInfos }: { keys: Record<string, ISecretStorageKeyInfo> },
): Promise<any> {
    const cl = client()
    let keyId = await cl.getDefaultSecretStorageKeyId() as string
    let keyInfo: any
    if (!keyInfos) {
        return ["", new Uint8Array()]
    }
    if (keyId) {
        // use the default SSSS key if set
        keyInfo = keyInfos[keyId]
        if (!keyInfo) {
            // if the default key is not available, pretend the default key
            // isn't set
            keyId = ""
        }
    } else {
        // if no default SSSS key is set, fall back to a heuristic of using the
        // only available key, if only one key is set
        const keyInfoEntries = Object.entries(keyInfos)
        if (keyInfoEntries.length > 1) {
            throw new Error("Multiple storage key requests not implemented")
        }
        if (keyInfoEntries[0]) {
            keyId = keyInfoEntries[0][0]
            keyInfo = keyInfoEntries[0][1]
        }
    }

    // Check the in-memory cache
    if (secretStorageKeys[keyId] && isCachingAllowed()) {
        return [keyId, secretStorageKeys[keyId]]
    }

    const inputToKey = makeInputToKey(keyInfo)
    const promise = new Promise<InputToKeyParams>((resolve, reject) => {
        setSecretStorageKeyResolveAndReject({
            reject,
            resolve
        })
    })

    onHasPassphrase(Boolean(keyInfo.passphrase))
    setCheckKeyInfo({ keyInfo, inputToKey: inputToKey })

    const input = await promise

    const key = await inputToKey(input)

    if (dehydrationCache.key) {
        if (
            await client().checkSecretStorageKey(dehydrationCache.key, keyInfo)
        ) {
            cacheSecretStorageKey(keyId, keyInfo, dehydrationCache.key)
            return [keyId, dehydrationCache.key]
        }
    }
    cacheSecretStorageKey(keyId, keyInfo, key)

    return [keyId, key]
}

export async function getDehydrationKey(
    keyInfo: ISecretStorageKeyInfo,
): Promise<Uint8Array> {
    const inputToKey = makeInputToKey(keyInfo)
    const key = await inputToKey({ passphrase: "", recoveryKey: "" })

    // need to copy the key because rehydration (unpickling) will clobber it
    dehydrationCache = { key: new Uint8Array(key), keyInfo }

    return key
}


async function onSecretRequested(
    userId: string,
    deviceId: string,
    requestId: string,
    name: string,
    deviceTrust: DeviceTrustLevel,
): Promise<string> {
    console.log(
        "onSecretRequested", userId, deviceId, requestId, name, deviceTrust
    )
    const cl = client()
    if (userId !== cl.getUserId()) {
        return ""
    }
    if (!deviceTrust || !deviceTrust.isVerified()) {
        console.log(`Ignoring secret request from untrusted device ${deviceId}`)
        return ""
    }
    if (
        name === "m.cross_signing.master" ||
        name === "m.cross_signing.self_signing" ||
        name === "m.cross_signing.user_signing"
    ) {
        const callbacks = cl.getCrossSigningCacheCallbacks()
        if (!callbacks.getCrossSigningKeyCache) return ""
        const keyId = name.replace("m.cross_signing.", "")
        const key = await callbacks.getCrossSigningKeyCache(keyId)
        if (!key) {
            console.log(
                `${keyId} requested by ${deviceId}, but not found in cache`
            )
        }
        return key && encodeBase64(key)
    } else if (name === "m.megolm_backup.v1") {
        const key = await cl.crypto.getSessionBackupPrivateKey()
        if (!key) {
            console.log(
                // eslint-disable-next-line max-len
                `session backup key requested by ${deviceId}, but not found in cache`,
            )
        }
        if (key) {
            return encodeBase64(key)
        }
    }
    console.log("onSecretRequested didn't recognise the secret named ", name)
    return ""
}

export const crossSigningCallbacks: ICryptoCallbacks = {
    getSecretStorageKey,
    cacheSecretStorageKey,
    onSecretRequested,
    getDehydrationKey,
}

export const GetPickleKey =
    async (userId: string, deviceId: string): Promise<string | null> => {
        if (!window.crypto || !window.crypto.subtle) {
            return null
        }
        let data
        try {
            data = await IdbLoad("pickleKey", [userId, deviceId])
        } catch (e) {
            console.log("idbLoad for pickleKey failed", e)
        }
        if (!data) {
            return null
        }
        if (!data.encrypted || !data.iv || !data.cryptoKey) {
            console.log("Badly formatted pickle key")
            return null
        }

        const additionalData = new Uint8Array(
            userId.length + deviceId.length + 1
        )
        for (let i = 0; i < userId.length; i++) {
            additionalData[i] = userId.charCodeAt(i)
        }
        additionalData[userId.length] = 124 // "|"
        for (let i = 0; i < deviceId.length; i++) {
            additionalData[userId.length + 1 + i] = deviceId.charCodeAt(i)
        }

        try {
            const key = await crypto.subtle.decrypt(
                { name: "AES-GCM", iv: data.iv, additionalData },
                data.cryptoKey,
                data.encrypted,
            )
            return encodeUnpaddedBase64(key)
        } catch (e) {
            console.log("Error decrypting pickle key")
            return null
        }
    }

export const CreatePickleKey =
    async (userId: string, deviceId: string): Promise<string | null> => {
        if (!window.crypto || !window.crypto.subtle) {
            return null
        }
        const crypto = window.crypto
        const randomArray = new Uint8Array(32)
        crypto.getRandomValues(randomArray)
        const cryptoKey = await crypto.subtle.generateKey(
            { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"],
        )
        const iv = new Uint8Array(32)
        crypto.getRandomValues(iv)

        const additionalData = new Uint8Array(
            userId.length + deviceId.length + 1
        )
        for (let i = 0; i < userId.length; i++) {
            additionalData[i] = userId.charCodeAt(i)
        }
        additionalData[userId.length] = 124 // "|"
        for (let i = 0; i < deviceId.length; i++) {
            additionalData[userId.length + 1 + i] = deviceId.charCodeAt(i)
        }

        const encrypted = await crypto.subtle.encrypt(
            { name: "AES-GCM", iv, additionalData }, cryptoKey, randomArray,
        )

        try {
            await IdbSave(
                "pickleKey", [userId, deviceId], { encrypted, iv, cryptoKey }
            )
        } catch (e) {
            return null
        }
        return encodeUnpaddedBase64(randomArray)
    }