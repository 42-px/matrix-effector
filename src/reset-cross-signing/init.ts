import { IAuthData, InteractiveAuth } from "matrix-js-sdk"
import { forward, sample } from "effector"

import { client } from "@/matrix-client"
import { LOGIN_BY_PASSWORD } from "@/constants"
import { accessSecretStorage } from "@/cryptoCallbacks"
import { 
    bootstrapSecretStorageFx,
    confirmResetCrossSigningFx, 
    getSecureBackupSetupMethodsFx, 
    lossAllRecoveryKeyMethod, 
    onInteractiveAuthBusyChange, 
    onInteractiveAuthStateUpdate, 
    onNeedUserPassword,
    onUserPasswordError,
    onUserPasswordSuccess,
    submitAuthDict,
} from "./public"
import { 
    $interactiveAuthInstance,
    createInteractiveAuthFx,
    fetchBackupInfoFx,
    resetAllRecoveryKeyMethodsFx,
    setInteractiveAuth,
    submitAuthDictFx
} from "./private"
import { 
    ConfirmResetCrossSigningFxResult, 
    SecureBackupSetupMethod
} from "./types"
import { E2EE_WK_KEY, E2EE_WK_KEY_DEPRECATED } from "./constans"

$interactiveAuthInstance
    .on(setInteractiveAuth, (_, auth) => auth)
    .reset(onUserPasswordSuccess)

forward({
    from: lossAllRecoveryKeyMethod,
    to: fetchBackupInfoFx
})

forward({
    from: fetchBackupInfoFx.doneData,
    to: resetAllRecoveryKeyMethodsFx
})

sample({
    clock: submitAuthDict,
    source: $interactiveAuthInstance,
    filter: (
        isInstance: InteractiveAuth | null,
    ): isInstance is InteractiveAuth => Boolean(isInstance),
    fn: (auth, pass) => ({
        password: pass,
        interactiveAuth: auth
    }),
    target: submitAuthDictFx
})

sample({
    source: onInteractiveAuthStateUpdate,
    filter: ({status}) => status.errcode === "M_FORBIDDEN",
    fn: ({status}) => status.error as string,
    target: onUserPasswordError,
})

createInteractiveAuthFx.use(async (requestCallback) => {
    const cl = client()

    const interactiveAuth = new InteractiveAuth({
        doRequest: requestCallback,
        busyChanged: onInteractiveAuthBusyChange,
        stateUpdated: (nextStage, status) => {
            onInteractiveAuthStateUpdate({
                nextStage, status
            })
        },
        matrixClient: cl,
        // нам это не нужно 
        requestEmailToken: undefined as any
    })
    setInteractiveAuth(interactiveAuth)
    onNeedUserPassword()
    await interactiveAuth.attemptAuth()
    onUserPasswordSuccess()
})

confirmResetCrossSigningFx.use(async () => {
    const cl = client()
    const promise = new Promise<
        ConfirmResetCrossSigningFxResult
    >((res, rej) => {
        cl.bootstrapCrossSigning({
            authUploadDeviceSigningKeys: async (makeRequest) => {
                const requestCallback = (
                    auth: IAuthData, 
                ): Promise<IAuthData> => {
                    return makeRequest(auth)
                }
                await createInteractiveAuthFx(requestCallback)
            },

            setupNewCrossSigning: true,
        }).then(() => {
            res({
                result: true
            })
        })
    })
    return promise
})

submitAuthDictFx.use(async ({password, interactiveAuth}) => {
    const cl = client()
    await interactiveAuth.submitAuthDict(
        {
            "type": LOGIN_BY_PASSWORD,
            "user": cl.getUserId(),
            "identifier": {
                "type": "m.id.user",
                "user": cl.getUserId()
            },
            "password": password
        }
    )
})

submitAuthDictFx.finally.watch(console.log)

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

fetchBackupInfoFx.use(async () => {
    const cl = client()
    const backupInfo = await cl.getKeyBackupVersion()
    if (!backupInfo) return
    const backupSigStatus = (
        // we may not have started crypto yet, in which case we definitely don't trust the backup
        cl.isCryptoEnabled() && (await cl.isKeyBackupTrusted(backupInfo))
    )
})

bootstrapSecretStorageFx.use(async (key) => {
    const cl = client()
    await cl.bootstrapSecretStorage({
        createSecretStorageKey: async () => key,
        setupNewKeyBackup: true,
        setupNewSecretStorage: true,
    })
})
