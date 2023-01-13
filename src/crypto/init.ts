import { client } from "@/matrix-client"
import { forward } from "effector"

import { 
    decryptMegolmKeyFile, 
    encryptMegolmKeyFile
} from "@/MegolmExportEncryption"
import { destroyClientFx } from "@/app"

import { 
    setEnableCrypto,
    getIdentityKeyFx,
    getDeviceEd25519KeyFx,
} from "./private"
import { 
    $identityKey,
    $isCryptoEnabled,
    initCryptoFx,
    exportE2ERoomsKeysFx, 
    importE2ERoomsKeysFx,
    $deviceEd25519Key,
} from "./public"

$isCryptoEnabled
    .on(setEnableCrypto, (_, isEnabled) => isEnabled)
    .reset(destroyClientFx)

$identityKey
    .on(getIdentityKeyFx.doneData, (_, key) => key)
    .reset(destroyClientFx)

$deviceEd25519Key
    .on(getDeviceEd25519KeyFx.doneData, (_, key) => key)
    .reset(destroyClientFx)

forward({
    from: initCryptoFx.doneData,
    to: [getDeviceEd25519KeyFx, getIdentityKeyFx]
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

getDeviceEd25519KeyFx.use(() => {
    const cl = client()
    return cl.getDeviceEd25519Key()
})
