import { client } from "@/matrix-client"
import { forward } from "effector"

import { 
    decryptMegolmKeyFile, 
    encryptMegolmKeyFile
} from "@/MegolmExportEncryption"
import { destroyClientFx, initCryptoFx } from "@/app"

import { 
    getIdentityKeyFx,
    getDeviceEd25519KeyFx,
} from "./private"
import { 
    $identityKey,
    $isCryptoEnabled,
    exportE2ERoomsKeysFx, 
    importE2ERoomsKeysFx,
    $deviceEd25519Key,
} from "./public"

$isCryptoEnabled
    .on(initCryptoFx.doneData, () => true)
    .reset([destroyClientFx.done, initCryptoFx.failData])

$identityKey
    .on(getIdentityKeyFx.doneData, (_, key) => key)
    .reset(destroyClientFx.done)

$deviceEd25519Key
    .on(getDeviceEd25519KeyFx.doneData, (_, key) => key)
    .reset(destroyClientFx.done)

forward({
    from: initCryptoFx.doneData,
    to: [getDeviceEd25519KeyFx, getIdentityKeyFx]
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
