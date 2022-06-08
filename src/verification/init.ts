import { forward, sample, guard } from "effector"
import { client } from "@/matrix-client"
import { 
    updateVerificationPhase, 
    cancelVerificationEvent, 
    confirmSASVerificationFx, 
    onVerificationRequestFx, 
    startSASFx, 
    updateDeviceVerification,
} from "./private"
import { 
    $currentVerificationEvent, 
    $deviceIsVerifired, 
    $verificationEvents, 
    cancelVerificationEventFx,
    checkDeviceVerificationFx,
    confirmSASVerification,
    startMyDeviceVerificationFx,
    onVerificationRequest, 
    setCurrentVerificationEvent, 
    setDeviceVerifiedFx, 
    setMyDeviceVerifiedFx, 
    startSASVerification, 
} from "./public"
import { MyVerificationRequest, Phase } from "./types"
import { uid } from "@/utils"

$deviceIsVerifired
    .on(updateDeviceVerification, (_, isVerified) => isVerified)

$verificationEvents
    .on(onVerificationRequestFx.doneData, ((requests, req) => [
        ...requests, req
    ]))
    .on(updateVerificationPhase, (requests) => [...requests])
    .on(cancelVerificationEvent, (requests, req) => requests
        .filter((currentReq) => currentReq.id !== req.id)
    )
// @TODO When copying an object, access to private properties was lost
$currentVerificationEvent
    .on(setCurrentVerificationEvent, (_, req) => [req])
    .on(cancelVerificationEvent, 
        ([request], canceledReq) => (
            request?.id === canceledReq.id ? [] : [request]
        )
    )
    .on(updateVerificationPhase,
        ([request]) => [request]
    )

forward({
    from: setMyDeviceVerifiedFx.doneData,
    to: updateDeviceVerification
})

forward({
    from: cancelVerificationEventFx.doneData,
    to: cancelVerificationEvent
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

setMyDeviceVerifiedFx.use(async () => {
    const cl = client()
    const userId = cl.getUserId()
    const deviceId = cl.getDeviceId()
    await cl.setDeviceKnown(userId, deviceId, true)
    await cl.setDeviceVerified(userId, deviceId, true)
    return true
})

setDeviceVerifiedFx.use(async ({ userId, deviceId }) => {
    const cl = client()
    await cl.setDeviceKnown(userId, deviceId, true)
    await cl.setDeviceVerified(userId, deviceId, true)
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
            cancelVerificationEvent(request)
        } else if (request.phase === Phase.Done) {
            request.off("change", onChange)
            setMyDeviceVerifiedFx()
            cancelVerificationEvent(request)
        }
        if (
            request.phase === Phase.Started 
            && !(request.verifier as any).sasEvent
        ) {
            startSASFx(request)
        }
    }
    request.on("change", onChange)
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
    verifier.once("cancel", () => cancelVerificationEvent(request))

    try {
        await verifier.verify()
    } catch (e) {
        cancelVerificationEvent(request)
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

checkDeviceVerificationFx.use(async () => {
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

    updateDeviceVerification(isVerified)
})

startMyDeviceVerificationFx.use(async () => {
    const cl = client()
    const request = await cl
        .requestVerification(cl.getUserId()) as MyVerificationRequest
    request.id = uid()
    onVerificationRequest(request)
})
