import { throttle } from "patronum/throttle"
import { MappedRoom, MappedUser } from "@/types"
import {
    LoginByPasswordParams,
    LoginByTokenParams,
    LoginPayload,
    StartClientParams
} from "./types"
import { appDomain } from "./domain"
import { AuthClientParams, AuthData } from "./types"

export const onInitialSync = appDomain.event<MappedRoom[]>()
export const onCachedState = appDomain.event<MappedRoom[]>()
export const onSync = appDomain.event<MappedRoom[]>()
export const createOnSyncThrottled = (ms: number) =>
    throttle({ source: onSync, timeout: ms})

export const loginByPasswordFx = appDomain
    .effect<LoginByPasswordParams, LoginPayload, Error>()
export const loginByTokenFx = appDomain
    .effect<LoginByTokenParams, AuthData, Error>()
export const initStoreFx = appDomain.effect<void, void, Error>()
export const startClientFx = appDomain
    .effect<StartClientParams, void, Error>()
export const getLoggedUserFx = appDomain
    .effect<void, MappedUser | null, Error>()
export const stopClientFx = appDomain.effect<void, void, Error>()
export const logoutFx = appDomain.effect<void, void, Error>()
export const authClientFx = appDomain
    .effect<AuthClientParams, void, Error>()
export const logoutClientFx = appDomain
    .effect<void, void, Error>()
