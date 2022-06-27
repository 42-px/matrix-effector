import { forward, sample, guard } from "effector"
import { client } from "@/matrix-client"

import { uid } from "@/utils"

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
} from "./public"
import { MyVerificationRequest, Phase } from "./types"

$deviceIsVerified
    .on(updateDeviceVerification, (_, isVerified) => isVerified)

$verificationEvents
    .on(onVerificationRequestFx.doneData, ((requests, req) => [
        ...requests, req
    ]))
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
    const onChange = (e: any) => {
        if (request.accepting || request.phase === Phase.Ready) {
            if (currentRequest && currentRequest?.id !== request.id) {
                cancelVerificationEventFx(currentRequest)
            }
            updateVerificationPhase()
            setCurrentVerificationEvent(request)
        }

        if (request.cancelled) {
            request.off("change", onChange)
            onCancelVerificationEvent(request)
        }
        if (request.phase === Phase.Done) {
            request.off("change", onChange)
            onCancelVerificationEvent(request)
        }
        if (
            request.phase === Phase.Started 
            && !(request.verifier as any).sasEvent
        ) {
            startSASFx(request)
        }
    }
    request.on("change", onChange)
    request.on("error", console.error)
    const phaseArray = [Phase.Cancelled, Phase.Done, Phase.Requested]
    // Восстановление предыдущего реквеста после обновления приложения
    if (!currentRequest && !phaseArray.includes(request.phase)) {
        setCurrentVerificationEvent(request)
        if (
            request.phase === Phase.Started 
          && !(request.verifier as any).sasEvent
        ) {
            await startSASFx(request)
        }
    }
    // При запуски приложения, если девайс не верифицирован, то отправляется запрос на верификацию и мы сразу его принимаем
    if (request.isSelfVerification) {
        request.accept()
    }
    return request
})

startSASFx.use(async (request) => {
    const verifier = request.beginKeyVerification("m.sas.v1")
    verifier.once("show_sas", () => {
        updateVerificationPhase()
    })
    verifier.once("cancel", () => onCancelVerificationEvent(request))

    try {
        await verifier.verify()
    } catch (e) {
        onCancelVerificationEvent(request)
    }
})

cancelVerificationEventFx.use(async (req) => {
    await req.cancel()
    return req
})

confirmSASVerificationFx.use(async (currentRequest) => {
    try {
        await (currentRequest.verifier as any).sasEvent.confirm()
    } finally {
        updateVerificationPhase()
    }
})

checkMyDeviceVerificationFx.use(async () => {
    const cl = client()
    const deviceId = cl.getDeviceId()
    const userId = cl.getUserId()
    cl.downloadKeys([userId])
    const device = cl.getStoredDevice(  
        userId, deviceId
    )
    const crossSigningInfo = cl.getStoredCrossSigningForUser(cl.getUserId())
    const isVerified = crossSigningInfo.checkDeviceTrust(
        crossSigningInfo,
        device,
        false,
        true,
    ).isCrossSigningVerified()

    return isVerified
})

startMyDeviceVerificationFx.use(async () => {
    const cl = client()
    const request = await cl
        .requestVerification(cl.getUserId()) as MyVerificationRequest
    request.id = uid()
    onVerificationRequest(request)
})

startVerificationDeviceFx.use(async ({userId, deviceId}) => {
    const cl = client()
    const request = await cl
        .requestVerification(userId, [deviceId]) as MyVerificationRequest
    request.id = uid()
    return request
})

startVerificationUserFx.use(async (userId) => {
    const cl = client()
    const request = await cl
        .requestVerification(userId) as MyVerificationRequest
    request.id = uid()
    return request
})

requestAcceptFx.use(async (request) => {
    await request.accept()
})
