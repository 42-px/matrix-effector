import { throttle } from "patronum/throttle"
import {
    MappedRoom,
    MappedUser,
    MatrixLoginPayload
} from "@/types"
import {
    LoginByPasswordParams,
    LoginByTokenParams,
    StartClientParams,
    CreateClientParams, 
    AuthData 
} from "./types"
import { appDomain } from "./domain"

export const onInitialSync = appDomain.event<MappedRoom[]>()
export const onCachedState = appDomain.event<MappedRoom[]>()
export const onSync = appDomain.event<MappedRoom[]>()
export const createOnSyncThrottled = (ms: number) =>
    throttle({ source: onSync, timeout: ms})

export const loginByPasswordFx = appDomain
    .effect<LoginByPasswordParams, MatrixLoginPayload, Error>()
export const loginByTokenFx = appDomain
    .effect<LoginByTokenParams, AuthData, Error>()
export const initStoreFx = appDomain.effect<void, void, Error>()
export const startClientFx = appDomain
    .effect<StartClientParams, void, Error>()
export const getLoggedUserFx = appDomain
    .effect<void, MappedUser | null, Error>()
export const stopClientFx = appDomain.effect<void, void, Error>()
export const logoutFx = appDomain.effect<void, void, Error>()
export const createClientFx = appDomain
    .effect<CreateClientParams, void, Error>()
export const destroyClientFx = appDomain
    .effect<void, void, Error>()
