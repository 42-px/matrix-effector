import { client } from "@/matrix-client"
import { forward } from "effector"
import { onCancelVerificationRequest } from "./private"
import { 
    $currentVerificationEvent,
    $verificationEvents,
    onVerificationRequestFx,
    checkBackupKeyFx, 
    initCryptoFx, 
    setDeviceVerifiedFx,
    $deviceIsVerifired,
    updateDeviceVerification,
    setMyDeviceVerifiedFx,
    setCurrentVerificationEvent
} from "./public"
import { Phase } from "./types"

$deviceIsVerifired
    .on(updateDeviceVerification, (_, isVerified) => isVerified)

$verificationEvents
    .on(onVerificationRequestFx.doneData, ((requests, req) => [
        ...requests, req
    ]))
    .on(onCancelVerificationRequest, (state, req) => state
        .filter((currentReq) => currentReq !== req)
    )

$currentVerificationEvent
    .on(setCurrentVerificationEvent, (_, req) => req)
    .on(onCancelVerificationRequest, 
        (request, canceledReq) => request === canceledReq ? null : request
    )

forward({
    from: setMyDeviceVerifiedFx.doneData,
    to: updateDeviceVerification
})

checkBackupKeyFx.use(async () => client().getKeyBackupEnabled())

initCryptoFx.use(async () => {
    const cl = client()
    if (!cl.initCrypto) return
    await cl.initCrypto()
    // @TODO Убрать хардкод. Настройка ручной верификации каждой сессии
    cl.setCryptoTrustCrossSignedDevices(false)
    const deviceId = cl.getDeviceId()
    // const backupInfo = await cl.getKeyBackupVersion()
    // if (backupInfo) {
    // don't await, because this can take a long times
    // cl.restoreKeyBackupWithSecretStorage(backupInfo).then(console.log)
    // }
    const userId = cl.getUserId()
    cl.downloadKeys([userId])
    const device = cl.getStoredDevice(  
        userId, deviceId
    )
    if (device.isUnverified()) {
        cl.requestVerification(userId)
        // startVerivication(currentVerificationRequest)
        // setDeviceVerifiedFx({deviceId, userId})
    }
    updateDeviceVerification(device.isVerified())
})

setMyDeviceVerifiedFx.use(async () => {
    const cl = client()
    const userId = cl.getUserId()
    const deviceId = cl.getDeviceId()
    await cl.setDeviceKnown(userId, deviceId, true)
    await cl.setDeviceVerified(userId, deviceId, true)
    return true
} )

setDeviceVerifiedFx.use(async ({ userId, deviceId }) => {
    const cl = client()
    await cl.setDeviceKnown(userId, deviceId, true)
    await cl.setDeviceVerified(userId, deviceId, true)
})

onVerificationRequestFx.use(async (request) => {
    const cl = client()
    
    const onChange = () => {
        console.log("request.accepting", request)
        if (request.accepting) {
            onCancelVerificationRequest(request)
            setCurrentVerificationEvent(request)
        }
        if (request.cancelled) {
            request.off("change", onChange)
            onCancelVerificationRequest(request)
        } else if (request.phase === Phase.Done) {
            request.off("change", onChange)
            const publicKeysTrusted = cl.getCrossSigningId()
            console.log(publicKeysTrusted ? Phase.Done : Phase.Requested)
            onCancelVerificationRequest(request)
        }
    }

    // await request.accept()
    request.on("change", onChange)
    return request
    // return {
    //     challenge: [] as any,
    //     accept(challengeMatches: boolean) {
    //         if (!challengeMatches) {
    //             sasEvent.mismatch()
    //         } else {
    //             sasEvent.confirm()
    //         }
    //         clearCurrentVerificationRequest()
    //     },
    //     cancel() {
    //         if (!request.cancelled) {
    //             sasEvent.cancel()
    //             clearCurrentVerificationRequest()
    //         }
    //     },
    //     cancelPromise: request.waitFor(() => {
    //         console.log("request.cancelled", request.cancelled)
            
    //         if (request.cancelled) {
    //             clearCurrentVerificationRequest()
    //         }
    //         return  request.cancelled
    //     }),
    // }
})
