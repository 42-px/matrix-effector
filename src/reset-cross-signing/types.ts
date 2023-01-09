import { AuthType, InteractiveAuth, IStageStatus } from "matrix-js-sdk"

export type SubmitAuthDictFxParams = {
    password: string
    interactiveAuth: InteractiveAuth
}
export type ConfirmResetCrossSigningFxResult = {
    result: boolean
}
export type OnInteractiveAuthStateUpdateResult = {
    nextStage: AuthType
    status: IStageStatus
}