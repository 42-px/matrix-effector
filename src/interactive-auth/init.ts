import { sample } from "effector"
import { InteractiveAuth } from "matrix-js-sdk"

import { LOGIN_BY_PASSWORD } from "@/constants"
import { client } from "@/matrix-client"

import { 
    $interactiveAuthInstance, 
    setInteractiveAuth, 
    submitAuthDictFx 
} from "./private"
import { 
    createInteractiveAuthFx, 
    onInteractiveAuthBusyChange,
    onInteractiveAuthStateUpdate,
    onNeedUserPassword,
    onUserPasswordError,
    onUserPasswordSuccess,
    submitAuthDict
} from "./public"

$interactiveAuthInstance
    .on(setInteractiveAuth, (_, auth) => auth)
    .reset(onUserPasswordSuccess)

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
