import { client } from "@/matrix-client"
import { checkMyDeviceVerificationFx } from "@/verification"
import { 
    checkBackupKeyFx, 
    initCryptoFx, 
} from "./public"

checkBackupKeyFx.use(async () => client().getKeyBackupEnabled())

initCryptoFx.use(async () => {
    const cl = client()

    if (!cl.initCrypto) return
    await cl.initCrypto()
    // @TODO Убрать хардкод. Настройка ручной верификации каждой сессии
    cl.setCryptoTrustCrossSignedDevices(false)
    // const backupInfo = await cl.getKeyBackupVersion()
    // if (backupInfo) {
    // don't await, because this can take a long times
    // cl.restoreKeyBackupWithSecretStorage(backupInfo).then(console.log)
    // }
    checkMyDeviceVerificationFx()
})

