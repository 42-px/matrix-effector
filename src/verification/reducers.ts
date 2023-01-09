import { VerificationRequestEvent } from "matrix-js-sdk"
import {
    onCancelVerificationEvent, 
    startSASFx, 
    updateVerificationPhase,
    cancelVerificationEventFx, 
} from "./private"
import {
    onUsersProfileUpdate, 
    setCurrentVerificationEvent 
} from "./public"
import { 
    MyVerificationRequest,
    OnVerificationRequestFxParams, 
    Phase
} from "./types"


export const onVerificationRequestFxReducer = async (
    {
        request, 
        currentRequest
    }: OnVerificationRequestFxParams): Promise<MyVerificationRequest> => {
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
}
