import { IAuthData, InteractiveAuth } from "matrix-js-sdk"
import { sample } from "effector"

import { client } from "@/matrix-client"
import { LOGIN_BY_PASSWORD } from "@/constants"

import { 
    confirmResetCrossSigningFx, 
    onInteractiveAuthBusyChange, 
    onInteractiveAuthStateUpdate, 
    onNeedUserPassword,
    onUserPasswordError,
    submitAuthDict
} from "./public"
import { 
    $interactiveAuthInstance,
    setInteractiveAuth,
    submitAuthDictFx
} from "./private"
import { ConfirmResetCrossSigningFxResult } from "./types"

$interactiveAuthInstance
    .on(setInteractiveAuth, (_, auth) => auth)

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
