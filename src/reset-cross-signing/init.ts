import { IAuthData, InteractiveAuth } from "matrix-js-sdk"

import { client } from "@/matrix-client"
import { confirmResetCrossSigningFx } from "./public"


confirmResetCrossSigningFx.use(async () => {
    const cl = client()
    await cl.bootstrapCrossSigning({
        authUploadDeviceSigningKeys: async (makeRequest) => {
            const requestCallback = (
                auth: IAuthData, 
                background: boolean
            ): Promise<IAuthData> => {
                return makeRequest(auth)
            }
            const authLogic = new InteractiveAuth({
                authData: undefined,
                doRequest: requestCallback,
                busyChanged: console.log,
                stateUpdated: console.log.bind(undefined, "stateUpdated"),
                matrixClient: cl,
                sessionId: undefined,
                clientSecret: undefined,
                emailSid: undefined,
                requestEmailToken: console.log as any,
            })
            authLogic.attemptAuth().then((result) => {
                const extra = {
                    emailSid: authLogic.getEmailSid(),
                    clientSecret: authLogic.getClientSecret(),
                }
                console.log("authUploadDeviceSigningKeys finish", 
                    true, result, extra)
            }).catch((error) => {
                console.log("authUploadDeviceSigningKeys finish", false, error)
            })
            await authLogic.submitAuthDict(
                {
                    "type": "m.login.password",
                    "user": "@testuser2:spurdo.xyz",
                    "identifier": {
                        "type": "m.id.user",
                        "user": "@testuser2:spurdo.xyz"
                    },
                    "password": "123123"
                }
            )
        },
        setupNewCrossSigning: true,
    })
    // return request
})
