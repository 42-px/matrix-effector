import { InteractiveAuth } from "matrix-js-sdk"
import { d } from "./domain"
import { SubmitAuthDictFxParams } from "./types"

export const $interactiveAuthInstance = d.store<InteractiveAuth | null>(null)

export const setInteractiveAuth = d.event<InteractiveAuth>()
export const submitAuthDictFx = d
    .effect<SubmitAuthDictFxParams, void, Error>()
