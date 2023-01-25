import { throttle } from "patronum/throttle"
import { 
    Room, 
    RoomMember, 
    User
} from "matrix-js-sdk"

import {
    MappedRoom,
    MappedUser,
    MatrixLoginPayload,
    Message,
    UserId
} from "@/types"

import {
    LoginByPasswordParams,
    LoginByTokenParams,
    StartClientParams,
    CreateClientParams, 
    AuthData,
    MyVerificationRequest
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
export const getProfileInfoFx = appDomain
    .effect<string, MappedUser, Error>()

export const $currentDeviceId = appDomain.store<string | null>(null)

export const onUpdateKeyBackupStatus = appDomain.event<void>()

export const onRoomMessage = appDomain.event<Message>()
export const directRoomCreated = appDomain.event<Room>()
export const roomCreated = appDomain.event<Room>()
export const messagesUpdated = appDomain.event<void>()
export const roomMemberUpdated = appDomain.event<RoomMember>()
export const roomUserUpdated = appDomain.event<User>()
export const toggleTypingUser = appDomain.event<RoomMember>()
export const onSessionRemaining = appDomain.event<number>()
export const crossSigningKeyChanged = appDomain.event<void>()
export const crossSigningStatusUpdated = appDomain.event<void>()
export const onVerificationRequest = appDomain.event<MyVerificationRequest>()
export const onUpdateDeviceList = appDomain.event<string[]>()
export const onUsersProfileUpdate = appDomain.event<UserId[]>()
export const initCryptoFx = appDomain.effect<void, void, Error>()
