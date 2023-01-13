import { IAuthData } from "matrix-js-sdk"
import { forward } from "effector"

import { client } from "@/matrix-client"
import { createInteractiveAuthFx } from "@/interactive-auth"
import { destroyClientFx } from "@/app"

import { 
    $crossSigningId, 
    confirmResetCrossSigningFx, 
    crossSigningChangeFx, 
    onCrossSigningKeyChange
} from "./public"
import { ConfirmResetCrossSigningFxResult } from "./types"
import { getCrossSigningIdFx } from "./private"

$crossSigningId
    .on(getCrossSigningIdFx.doneData, (_, id) => id)
    .reset(destroyClientFx)

forward({
    from: onCrossSigningKeyChange,
    to: crossSigningChangeFx
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
