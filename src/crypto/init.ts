import { client } from "@/matrix-client"
import { forward } from "effector"
import { checkThisDeviceVerificationFx } from "@/verification"
import { destroyClientFx } from "@/app"
import { 
    crossSigningChangeFx, 
    setEnableCrypto
} from "./private"
import { 
    $isCryptoEnabled,
    $isKeyBackupEnabled,
    checkBackupKeyFx, 
    initCryptoFx,
    onCrossSigningKeyChange, 
} from "./public"

$isKeyBackupEnabled
    .on(checkBackupKeyFx.doneData, (_, isEnabled) => isEnabled)
    .reset(destroyClientFx)

$isCryptoEnabled
    .on(setEnableCrypto, (_, isEnabled) => isEnabled)
    .reset(destroyClientFx)

forward({
    from: onCrossSigningKeyChange,
    to: crossSigningChangeFx
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
    checkThisDeviceVerificationFx()
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

    checkThisDeviceVerificationFx()
})
