import { forward, sample, guard, attach } from "effector"
import { client } from "@/matrix-client"

import { createDirectRoomFx } from "@/room"
import { MappedUser } from "@/types"
import { destroyClientFx } from "@/app"
import { InvalidBackupInfo } from "@/errors"

import {
    updateVerificationPhase,
    onCancelVerificationEvent,
    confirmSASVerificationFx,
    onVerificationRequestFx,
    startSASFx,
    updateDeviceVerification,
    startVerificationDeviceFx,
    startVerificationUserFx,
    requestAcceptFx,
    cancelAllRequestsFx,
    restoreKeyBackupFx,
    cancelVerificationEventFx,
    validateRecoveryKeyFx,
    $checkKeyInfo,
    validatePassphraseFx,
} from "./private"
import {
    onHasPassphrase,
    $currentVerificationEvent,
    $deviceIsVerified,
    $verificationEvents,
    checkThisDeviceVerificationFx,
    confirmSASVerification,
    startThisDeviceVerificationFx,
    onVerificationRequest,
    setCurrentVerificationEvent,
    startSASVerification,
    onUpdateDeviceList,
    startVerificationDevice,
    startVerificationUser,
    onRequestAccept,
    onRequestCancel,
    cancelAllRequests,
    checkCanVerifyFx,
    startRecoveryKeyOrPassphraseVerification,
    $hasPassphrase,
    setWaitingAnotherUser,
    resetWaitingAnotherUser,
    setCheckKeyInfo,
    validateRecoveryKey,
    onValidRecoveryKey,
    onInvalidRecoveryKey,
    onRejectSecretStorageKey,
    validatePassphrase,
    onInvalidPassphrase,
    onValidPassphrase,
} from "./public"
import { 
    MyVerificationRequest, 
    ValidatePassphraseFxParams, 
    ValidateRecoveryKeyFxParams 
} from "./types"
import { onVerificationRequestFxReducer } from "./reducers"
import { accessSecretStorage, makeInputToKey } from "../cryptoCallbacks"
    
$deviceIsVerified
    .on(updateDeviceVerification, (_, isVerified) => isVerified)
    .reset(destroyClientFx)

$verificationEvents
    .on(onVerificationRequestFx.doneData, ((requests, req) => ([
        ...requests, req
    ])))
    .on(updateVerificationPhase, (requests) => [...requests])
    .on(onCancelVerificationEvent, (requests, req) => requests
        .filter((currentReq) => currentReq.id !== req.id)
    )
    .reset(destroyClientFx)
// When copying an object, proto properties was lost
$currentVerificationEvent
    .on(setCurrentVerificationEvent, (_, req) => [req])
    .on(onCancelVerificationEvent,
        ([request], canceledReq) => (
            request?.id === canceledReq.id ? [] : [request]
        )
    )
    .on(updateVerificationPhase,
        ([request]) => [request]
    )
    .reset(destroyClientFx)

$hasPassphrase
    .on(onHasPassphrase, (_, val) => val)
    .reset(destroyClientFx)

$checkKeyInfo
    .on(setCheckKeyInfo, (_, val) => val)
    .reset([destroyClientFx, onRejectSecretStorageKey])

forward({
    from: checkThisDeviceVerificationFx.doneData,
    to: updateDeviceVerification
})

forward({
    from: onUpdateDeviceList,
    to: checkThisDeviceVerificationFx
})

forward({
    from: cancelVerificationEventFx.doneData,
    to: onCancelVerificationEvent
})

forward({
    from: startVerificationDevice,
    to: startVerificationDeviceFx
})

forward({
    from: startVerificationUser,
    to: startVerificationUserFx
})

forward({
    from: [
        startVerificationUserFx,
        startVerificationDeviceFx,
        confirmSASVerification,
        startSASFx,
        startThisDeviceVerificationFx
    ],
    to: setWaitingAnotherUser
})

forward({
    from: [
        onCancelVerificationEvent,
        $currentVerificationEvent.updates
    ],
    to: resetWaitingAnotherUser
})

forward({
    from: [
        startVerificationUserFx.doneData,
        startVerificationDeviceFx.doneData
    ],
    to: onVerificationRequest
})

forward({
    from: onRequestAccept,
    to: requestAcceptFx
})

forward({
    from: onRequestCancel,
    to: cancelVerificationEventFx
})

forward({
    from: startRecoveryKeyOrPassphraseVerification,
    to: restoreKeyBackupFx
})

forward({
    from: validateRecoveryKeyFx.doneData,
    to: onValidRecoveryKey
})

forward({
    from: validateRecoveryKeyFx.failData,
    to: onInvalidRecoveryKey,
})

forward({
    from: validatePassphraseFx.doneData,
    to: onValidPassphrase
})

forward({
    from: validatePassphraseFx.failData,
    to: onInvalidPassphrase,
})

sample({
    clock: onVerificationRequest,
    source: $currentVerificationEvent,
    fn: ([currentRequest], request) => ({
        request, currentRequest
    }),
    target: onVerificationRequestFx
})

sample({
    clock: cancelAllRequests,
    source: $verificationEvents,
    target: cancelAllRequestsFx
})

guard({
    clock: confirmSASVerification,
    source: $currentVerificationEvent
        .map(request => request.length ? request[0] : null),
    filter: (req): req is MyVerificationRequest => Boolean(req),
    target: confirmSASVerificationFx
})

guard({
    clock: startSASVerification,
    source: $currentVerificationEvent
        .map(request => request.length ? request[0] : null),
    filter: (req): req is MyVerificationRequest => Boolean(req),
    target: startSASFx
})

onVerificationRequestFx.use(onVerificationRequestFxReducer)

requestAcceptFx.use(async (request) => {
    await request.accept()
})

startSASFx.use(async (request) => {
    const verifier = request.beginKeyVerification("m.sas.v1")
    verifier.once("show_sas", updateVerificationPhase)
    verifier.once("cancel", () => onCancelVerificationEvent(request))
    await verifier.verify()
})

cancelVerificationEventFx.use(async (req) => {
    await req.cancel()
    return req
})

confirmSASVerificationFx.use(async (currentRequest) => {
    await (currentRequest.verifier as any).sasEvent.confirm()
})

checkThisDeviceVerificationFx.use(async () => {
    const cl = client()
    const deviceId = cl.getDeviceId()
    const userId = cl.getUserId()
    await cl.downloadKeys([userId])
    const isVerified = cl
        .checkDeviceTrust(userId, deviceId).isCrossSigningVerified()
    return isVerified
})

startThisDeviceVerificationFx.use(async () => {
    const cl = client()
    const request = await cl
        .requestVerification(cl.getUserId()) as MyVerificationRequest
    request.id = Date.now()
    onVerificationRequest(request)
})

startVerificationDeviceFx.use(async ({ userId, deviceId }) => {
    const cl = client()
    const request = await cl
        .requestVerification(userId, [deviceId]) as MyVerificationRequest
    request.id = Date.now()
    return request
})

const findOrCreateDirectRoomFx = attach({
    effect: createDirectRoomFx
})

startVerificationUserFx.use(async (userId) => {
    const cl = client()
    const user = cl.getUser(userId) as unknown as MappedUser
    const dmRoom = await findOrCreateDirectRoomFx({ user })
    const request = await cl
        .requestVerificationDM(userId, dmRoom.roomId) as MyVerificationRequest
    request.id = Date.now()
    return request
})

cancelAllRequestsFx.use(async (requests) => {
    requests.forEach(request => request.cancel())
})

checkCanVerifyFx.use(async ({ profileId }) => {
    const cl = client()
    const cryptoEnabled = cl.isCryptoEnabled()
    const homeserverSupportsCrossSigning = await cl
        .doesServerSupportUnstableFeature("org.matrix.e2e_cross_signing")

    const deviceId = cl.getDeviceId()
    const userId = cl.getUserId()
    await cl.downloadKeys([userId])
    const isVerified = cl
        .checkDeviceTrust(userId, deviceId).isCrossSigningVerified()

    const userTrust = cryptoEnabled && cl.checkUserTrust(profileId)
    const userVerified = cryptoEnabled && userTrust && userTrust
        .isCrossSigningVerified()
    const isMe = profileId === cl.getUserId()
    if (isMe && isVerified) return true

    const canVerify = cryptoEnabled
        && homeserverSupportsCrossSigning
        && !userVerified
        && isVerified
    return canVerify
})

restoreKeyBackupFx.use(async () => {
    const cl = client()
    accessSecretStorage(async () => {
        const backupInfo = await cl.getKeyBackupVersion()
        await cl.checkOwnCrossSigningTrust()

        if (!backupInfo) throw new InvalidBackupInfo("backupInfo is null")
        await cl.restoreKeyBackupWithSecretStorage(backupInfo)
    })
})

guard({
    source: sample({
        clock: validateRecoveryKey,
        source: $checkKeyInfo,
        fn: (checkKeyInfo, input) => ({
            keyInfo: checkKeyInfo?.keyInfo,
            input
        }),
    }),
    filter: (params): params is ValidateRecoveryKeyFxParams => Boolean(
        params.keyInfo
    ),
    target: validateRecoveryKeyFx,
})

guard({
    source: sample({
        clock: validatePassphrase,
        source: $checkKeyInfo,
        fn: (checkKeyInfo, passphrase) => ({
            keyInfo: checkKeyInfo?.keyInfo,
            passphrase,
        }),
    }),
    filter: (params): params is ValidatePassphraseFxParams => Boolean(
        params.keyInfo
    ),
    target: validatePassphraseFx,
})

validateRecoveryKeyFx.use(async ({ input, keyInfo }) => {
    const cl = client()
    const decodedKey = cl.keyBackupKeyFromRecoveryKey(input)
    const isValid = await cl.checkSecretStorageKey(
        decodedKey, keyInfo,
    )
    if (!isValid) throw new Error("Invalid recovery Key")
    return isValid
})

validatePassphraseFx.use( async ({keyInfo, passphrase}) => {
    const cl = client()
    const makeInput = makeInputToKey(keyInfo)
    const decodedKey = await makeInput({passphrase})
    const isValid = await cl.checkSecretStorageKey(
        decodedKey, keyInfo,
    )
    if (!isValid) throw new Error("Invalid passphrase")
    return isValid
})

