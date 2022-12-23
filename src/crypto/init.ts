import { client } from "@/matrix-client"
import { forward } from "effector"

import { 
    decryptMegolmKeyFile, 
    encryptMegolmKeyFile
} from "@/MegolmExportEncryption"
import { checkThisDeviceVerificationFx } from "@/verification"
import { destroyClientFx } from "@/app"

import { 
    crossSigningChangeFx, 
    getIdentityKeyFx, 
    setEnableCrypto
} from "./private"
import { 
    $identityKey,
    $isCryptoEnabled,
    $isKeyBackupEnabled,
    checkBackupKeyFx, 
    initCryptoFx,
    exportE2ERoomsKeysFx, 
    onCrossSigningKeyChange,
    importE2ERoomsKeysFx, 
} from "./public"

$isKeyBackupEnabled
    .on(checkBackupKeyFx.doneData, (_, isEnabled) => isEnabled)
    .reset(destroyClientFx)

$isCryptoEnabled
    .on(setEnableCrypto, (_, isEnabled) => isEnabled)
    .reset(destroyClientFx)

$identityKey
    .on(getIdentityKeyFx.doneData, (_, key) => key)
    .reset(destroyClientFx)

forward({
    from: onCrossSigningKeyChange,
    to: crossSigningChangeFx
})

forward({
    from: initCryptoFx.done,
    to: getIdentityKeyFx
})

forward({
    from: [initCryptoFx.done, crossSigningChangeFx.done],
    to: checkThisDeviceVerificationFx
})

checkBackupKeyFx.use(() => {
    return client().getKeyBackupEnabled()
})

initCryptoFx.use(async () => {
    const cl = client()

    if (!cl.initCrypto) {
        setEnableCrypto(false)
        return
    }

    await cl.initCrypto()
    setEnableCrypto(true)
    // @TODO Убрать хардкод.
    // Не нашел явной доки, но эта штука отвечает за то, 
    // можешь ли ты писать в конмату в которой находятся не верифицированные тобою девайсы
    cl.setGlobalErrorOnUnknownDevices(false)
    cl.setCryptoTrustCrossSignedDevices(true)
})

crossSigningChangeFx.use(async () => {
    const cl = client()
    if (!(
        await cl.doesServerSupportUnstableFeature(
            "org.matrix.e2e_cross_signing"
        )
    )) return

    if (!cl.isCryptoEnabled()) return
    if (!cl.isInitialSyncComplete()) return

})

getIdentityKeyFx.use(() => {
    const key = client().getDeviceEd25519Key()
    if (!key) throw new Error("crypto is disabled")
    return key
})

exportE2ERoomsKeysFx.use(async ({passphrase}) => {
    const cl = client()
    const keys = await cl.exportRoomKeys()

    return encryptMegolmKeyFile(
        JSON.stringify(keys), passphrase,
    )
})

importE2ERoomsKeysFx.use(async ({arrayBuffer, passphrase}) => {
    const keys = await decryptMegolmKeyFile(
        arrayBuffer, passphrase,
    )
    const cl = client()
    cl.importRoomKeys(JSON.parse(keys))
})
