import { AuthType, InteractiveAuth, IStageStatus } from "matrix-js-sdk"

export type OnInteractiveAuthStateUpdateResult = {
    nextStage: AuthType
    status: IStageStatus
}

export type SubmitAuthDictFxParams = {
    password: string
    interactiveAuth: InteractiveAuth
}