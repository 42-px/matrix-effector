import { forward, sample, guard, attach } from "effector"
import { VerificationRequestEvent } from "matrix-js-sdk"

import { client } from "@/matrix-client"
import { createDirectRoomFx } from "@/room"
import { MappedUser } from "@/types"

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
} from "./private"
import { 
    $currentVerificationEvent, 
    $deviceIsVerified, 
    $verificationEvents, 
    cancelVerificationEventFx,
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
    onUsersProfileUpdate
} from "./public"
import { MyVerificationRequest, Phase } from "./types"

$deviceIsVerified
    .on(updateDeviceVerification, (_, isVerified) => isVerified)

$verificationEvents
    .on(onVerificationRequestFx.doneData, ((requests, req) => ([
        ...requests, req
    ])))
    .on(updateVerificationPhase, (requests) => [...requests])
    .on(onCancelVerificationEvent, (requests, req) => requests
        .filter((currentReq) => currentReq.id !== req.id)
    )
// @TODO When copying an object, access to private properties was lost
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

onVerificationRequestFx.use(async ({request, currentRequest}) => {
    const onChange = () => {
        if (request.cancelled) {
            request.off(VerificationRequestEvent.Change, onChange)
            onCancelVerificationEvent(request)
            console.error("request.cancelled", request.cancellationCode)
            return
        }
        if (request.phase === Phase.Done) {
            request.off(VerificationRequestEvent.Change, onChange)
            onCancelVerificationEvent(request)
            onUsersProfileUpdate([request.otherUserId])
            return
        }

        if (request.phase === Phase.Ready) {
            if (currentRequest && currentRequest?.id !== request.id) {
                cancelVerificationEventFx(currentRequest)
            }
            updateVerificationPhase()
            setCurrentVerificationEvent(request)
            return
        }

        if (
            request.phase === Phase.Started 
            && !(request.verifier as any).sasEvent
        ) {
            startSASFx(request)
            return
        }
    }
    request.on(VerificationRequestEvent.Change, onChange)
    const excludePhaseArray = [
        Phase.Cancelled, 
        Phase.Done, 
        Phase.Requested
    ]
    if (!currentRequest && !excludePhaseArray.includes(request.phase)) {
        setCurrentVerificationEvent(request)
        if (
            request.phase === Phase.Started 
          && !(request.verifier as any).sasEvent
        ) {
            await startSASFx(request)
        }
    }

    return request
})

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
