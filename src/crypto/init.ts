import { client } from "@/matrix-client"
import { checkMyDeviceVerificationFx } from "@/verification"
import { forward } from "effector"
import { crossSigningChangeFx } from "./private"
import { 
    $isKeyBackupEnabled,
    checkBackupKeyFx, 
    initCryptoFx,
    onCrossSigningKeyChange, 
} from "./public"

$isKeyBackupEnabled
    .on(checkBackupKeyFx.doneData, (_, isEnabled) => isEnabled)

forward({
    from: onCrossSigningKeyChange,
    to: crossSigningChangeFx
})

checkBackupKeyFx.use(async () => client().getKeyBackupEnabled())

initCryptoFx.use(async () => {
    const cl = client()
    if (!cl.initCrypto) return

    await cl.initCrypto()
    // @TODO Убрать хардкод.
    // Не нашел явной доки, но эта штука отвечает за то, 
    // можешь ли ты писать в конмату в которой находятся не верифицированные тобою девайсы
    cl.setGlobalErrorOnUnknownDevices(false)
    cl.setCryptoTrustCrossSignedDevices(true)
    const backupInfo = await cl.getKeyBackupVersion()
    if (backupInfo) {
    // don't await, because this can take a long times
        cl.restoreKeyBackupWithSecretStorage(backupInfo).then(console.log)
    }
    checkMyDeviceVerificationFx()
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

    checkMyDeviceVerificationFx()
})
