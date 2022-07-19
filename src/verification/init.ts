import { forward, sample, guard, attach } from "effector"
import { VerificationRequestEvent } from "matrix-js-sdk"

import { client } from "@/matrix-client"
import { uid } from "@/utils"
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
    checkMyDeviceVerificationFx,
    confirmSASVerification,
    startMyDeviceVerificationFx,
    onVerificationRequest, 
    setCurrentVerificationEvent, 
    startSASVerification,
    onUpdateDeviceList,
    startVerificationDevice,
    startVerificationUser,
    onRequestAccept,
    onRequestCancel,
    cancelAllRequests, 
} from "./public"
import { MyVerificationRequest, Phase } from "./types"

const TEN_MINUTES = 600000

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
    from: checkMyDeviceVerificationFx.doneData,
    to: updateDeviceVerification
})

forward({
    from: onUpdateDeviceList,
    to: checkMyDeviceVerificationFx
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
        console.log("request UPDATE")
        if (request.accepting || request.phase === Phase.Ready) {
            if (currentRequest && currentRequest?.id !== request.id) {
                cancelVerificationEventFx(currentRequest)
            }
            updateVerificationPhase()
            setCurrentVerificationEvent(request)
        }

        if (request.cancelled) {
            request.off(VerificationRequestEvent.Change, onChange)
            onCancelVerificationEvent(request)
            console.error("request.cancelled", request.cancellationCode)
        }
        if (request.phase === Phase.Done) {
            request.off(VerificationRequestEvent.Change, onChange)
            onCancelVerificationEvent(request)
        }

        if (
            request.phase === Phase.Started 
            && !(request.verifier as any).sasEvent
        ) {
            startSASFx(request)
        }
    }
    request.on(VerificationRequestEvent.Change, onChange)
    const phaseArray = [
        Phase.Cancelled, 
        Phase.Done, 
        Phase.Requested
    ]
    if (!currentRequest && !phaseArray.includes(request.phase)) {
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
    console.log("MATRIX_EFFECTOR startSASFx")
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
    console.log("MATRIX_EFFECTOR confirmSASVerificationFx")
    await (currentRequest.verifier as any).sasEvent.confirm()
})

checkMyDeviceVerificationFx.use(async () => {
    const cl = client()
    const deviceId = cl.getDeviceId()
    const userId = cl.getUserId()
    await cl.downloadKeys([userId])
    const isVerified = cl
        .checkDeviceTrust(userId, deviceId).isCrossSigningVerified()
    return isVerified
})

startMyDeviceVerificationFx.use(async () => {
    console.log("MATRIX_EFFECTOR startMyDeviceVerificationFx")
    const cl = client()
    const request = await cl
        .requestVerification(cl.getUserId()) as MyVerificationRequest
    request.id = uid()
    onVerificationRequest(request)
})

startVerificationDeviceFx.use(async ({userId, deviceId}) => {
    console.log("MATRIX_EFFECTOR startVerificationDeviceFx")
    const cl = client()
    const request = await cl
        .requestVerification(userId, [deviceId]) as MyVerificationRequest
    request.id = uid()
    return request
})

const findOrCreateDirectRoomFx = attach({
    effect: createDirectRoomFx
})

startVerificationUserFx.use(async (userId) => {
    console.log("MATRIX_EFFECTOR startVerificationUserFx", userId)
    const cl = client()
    const user = cl.getUser(userId) as unknown as MappedUser
    const dmRoom = await findOrCreateDirectRoomFx({ user })
    const request = await cl
        .requestVerificationDM(userId, dmRoom.roomId) as MyVerificationRequest
    request.id = uid()
    return request
})

cancelAllRequestsFx.use(async (requests) => {
    requests.forEach(request => request.cancel())
})
