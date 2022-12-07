import { IAuthData } from "matrix-js-sdk"

import { client } from "@/matrix-client"
import { createInteractiveAuthFx } from "@/interactive-auth"

import { confirmResetCrossSigningFx } from "./public"
import { ConfirmResetCrossSigningFxResult } from "./types"

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
