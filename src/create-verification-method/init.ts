import { forward } from "effector"
import { IAuthData } from "matrix-js-sdk"

import { client } from "@/matrix-client"
import { SecureBackupSetupMethod } from "@/types"
import { accessSecretStorage } from "@/cryptoCallbacks"
import { createInteractiveAuthFx } from "@/interactive-auth"
import { 
    E2EE_WK_KEY, 
    E2EE_WK_KEY_DEPRECATED
} from "@/constants"

import { 
    bootstrapSecretStorageFx,
    createRecoveryKeyAndPassPhraseFx,
    getSecureBackupSetupMethodsFx,
    lossAllRecoveryKeyMethod, 
    onNewRecoveryMethodCreated, 
    resetAllRecoveryKeyMethodsFx,
    setupRecoveryMethodFx
} from "./public"

forward({
    from: lossAllRecoveryKeyMethod,
    to: resetAllRecoveryKeyMethodsFx
})

forward({
    from: bootstrapSecretStorageFx.doneData,
    to: onNewRecoveryMethodCreated,
})

setupRecoveryMethodFx.use(async () => accessSecretStorage())

resetAllRecoveryKeyMethodsFx.use(async () => {
    // Force reset secret storage (which resets the key backup)
    await accessSecretStorage(async () => {
        const cl = client()
        await cl.bootstrapCrossSigning({
            authUploadDeviceSigningKeys: async (makeRequest) => {
                const requestCallback = (
                    auth: IAuthData, 
                ): Promise<IAuthData> => {
                    return makeRequest(auth)
                }
                await createInteractiveAuthFx(requestCallback)
            },
            setupNewCrossSigning: true,
        })
    }, true)
})

bootstrapSecretStorageFx.use(async (key) => {
    const cl = client()
    await cl.bootstrapSecretStorage({
        createSecretStorageKey: async () => key,
        setupNewKeyBackup: true,
        setupNewSecretStorage: true,
    })
})

createRecoveryKeyAndPassPhraseFx.use(async (password) => {
    const cl = client()
    const key = await cl.createRecoveryKeyFromPassphrase(password)
    if (!key) throw new Error("createRecovery Error")
    return key
})

getSecureBackupSetupMethodsFx.use(() => {
    const clientWellKnown = client().getClientWellKnown()
    let wellKnown = null
    if (clientWellKnown && clientWellKnown[E2EE_WK_KEY]) {
        wellKnown = clientWellKnown[E2EE_WK_KEY]
    }
    if (clientWellKnown && clientWellKnown[E2EE_WK_KEY_DEPRECATED]) {
        wellKnown = clientWellKnown[E2EE_WK_KEY_DEPRECATED]
    }
    if (
        !wellKnown ||
        !wellKnown["secure_backup_setup_methods"] ||
        !wellKnown["secure_backup_setup_methods"].length ||
        !(
            wellKnown["secure_backup_setup_methods"]
                .includes(SecureBackupSetupMethod.Key) ||
            wellKnown["secure_backup_setup_methods"]
                .includes(SecureBackupSetupMethod.Passphrase)
        )
    ) {
        return [
            SecureBackupSetupMethod.Key,
            SecureBackupSetupMethod.Passphrase,
        ]
    }
    return wellKnown["secure_backup_setup_methods"]
})
