import { IAuthData } from "matrix-js-sdk"
import { forward } from "effector"

import { client } from "@/matrix-client"
import { createInteractiveAuthFx } from "@/interactive-auth"
import { destroyClientFx } from "@/app"
import { initCryptoFx } from "@/crypto"

import { 
    $crossSigningId, 
    $crossSigningStatus, 
    confirmResetCrossSigningFx, 
    crossSigningChangeFx, 
    onCrossSigningKeyChange,
    onUpdateCrossSigningStatus
} from "./public"
import { ConfirmResetCrossSigningFxResult } from "./types"
import { getCrossSigningIdFx, getCrossSigningStatusFx } from "./private"

$crossSigningId
    .on(getCrossSigningIdFx.doneData, (_, id) => id)
    .reset(destroyClientFx.done)

$crossSigningStatus
    .on(getCrossSigningStatusFx.doneData, (_, status) => status)
    .reset(destroyClientFx.done)

forward({
    from: onCrossSigningKeyChange,
    to: crossSigningChangeFx
})
forward({
    from: [
        onUpdateCrossSigningStatus, 
        initCryptoFx.done, 
    ],
    to: getCrossSigningStatusFx,
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

confirmResetCrossSigningFx.use(async () => {
    const cl = client()
    const promise = new Promise<
        ConfirmResetCrossSigningFxResult
    >((resolve, rej) => {
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
            resolve({
                result: true
            })
        })
    })
    return promise
})

getCrossSigningIdFx.use(() => {
    const cl = client()
    return cl.getCrossSigningId()
})

getCrossSigningStatusFx.use(async () => {
    const cl = client()
    const pkCache = cl.getCrossSigningCacheCallbacks()
    const crossSigning = cl.crypto.crossSigningInfo
    const secretStorage = cl.crypto.secretStorage
    const crossSigningPublicKeysOnDevice = Boolean(crossSigning.getId())
    const crossSigningPrivateKeysInStorage = Boolean(
        await crossSigning.isStoredInSecretStorage(secretStorage)
    )
    const masterPrivateKeyCached = !!(pkCache && (
        await pkCache.getCrossSigningKeyCache?.("master")
    ))
    const selfSigningPrivateKeyCached = !!(pkCache && (
        await pkCache.getCrossSigningKeyCache?.("self_signing")
    ))
    const userSigningPrivateKeyCached = !!(pkCache && (
        await pkCache.getCrossSigningKeyCache?.("user_signing")
    ))
    const homeserverSupportsCrossSigning =
        await cl
            .doesServerSupportUnstableFeature("org.matrix.e2e_cross_signing")
    const crossSigningReady = await cl.isCrossSigningReady()

    return {
        crossSigningPublicKeysOnDevice,
        crossSigningPrivateKeysInStorage,
        masterPrivateKeyCached,
        selfSigningPrivateKeyCached,
        userSigningPrivateKeyCached,
        homeserverSupportsCrossSigning,
        crossSigningReady,
    }
})
