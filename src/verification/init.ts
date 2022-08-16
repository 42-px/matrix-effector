import { forward, sample, guard, attach } from "effector"

import { client } from "@/matrix-client"
import { createDirectRoomFx } from "@/room"
import { MappedUser } from "@/types"
import { destroyClientFx } from "@/app"
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
    checkRecoveryKeyFx,
    $savedInputToKeyMethod,
    $secretStorageKeyResolveAndReject,
    restoreKeyBackupFx,
    cancelVerificationEventFx,
    checkPassphraseFx,
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
    createRecoveryKeyFx,
    checkRecoveryKey,
    saveInputToKeyMethod,
    setSecretStorageKeyResolveAndReject,
    startRecoveryKeyOrPassphraseVerification,
    checkPassphrase,
    $hasPassphrase,
} from "./public"
import { MyVerificationRequest } from "./types"
import { onVerificationRequestFxReducer } from "./reducers"
import { InvalidBackupInfo } from "@/errors"
import { accessSecretStorage } from "../cryptoCallbacks"

$savedInputToKeyMethod
    .on(saveInputToKeyMethod, (_, method) => method)
    .reset(destroyClientFx)

$secretStorageKeyResolveAndReject
    .on(setSecretStorageKeyResolveAndReject, (_, callbacks) => callbacks) 
    .reset(destroyClientFx)

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
    .on(onHasPassphrase, (_, val) => val )
    .reset(destroyClientFx)

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

startVerificationDeviceFx.use(async ({userId, deviceId}) => {
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

sample({
    clock: checkPassphrase,
    source: $secretStorageKeyResolveAndReject,
    filter: (resolveAndReject ) => resolveAndReject !== null,
    fn: (resolveAndReject, {passphrase}) => ({
        resolveAndReject: resolveAndReject as any,
        passphrase
    }),
    target: checkPassphraseFx
})

sample({
    clock: checkRecoveryKey,
    source: $secretStorageKeyResolveAndReject,
    filter: (resolveAndReject ) => resolveAndReject !== null,
    fn: (resolveAndReject, {recoveryKey}) => ({
        resolveAndReject: resolveAndReject as any,
        recoveryKey
    }),
    target: checkRecoveryKeyFx
})

checkRecoveryKeyFx.use(async ({resolveAndReject, recoveryKey}) => {
    resolveAndReject.resolve({recoveryKey})
})

checkPassphraseFx.use(async ({resolveAndReject, passphrase}) => {
    resolveAndReject.resolve({passphrase})
})

createRecoveryKeyFx.use(async () => {
    const cl = client()
    const key = await cl.createRecoveryKeyFromPassphrase()
    if (!key) throw new Error("createRecovery Error")
    return key
})

restoreKeyBackupFx.use(async () => {
    const cl = client()
    accessSecretStorage(async () => {
        const backupInfo = await cl.getKeyBackupVersion()
        await cl.checkOwnCrossSigningTrust()
    
        if (!backupInfo) throw new InvalidBackupInfo("backupInfo is null") 
        // don't await, because this can take a long times
        cl.restoreKeyBackupWithSecretStorage(backupInfo)
    })
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.createRecoveryKeyFx = createRecoveryKeyFx
