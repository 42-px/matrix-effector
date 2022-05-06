
import {
    VerificationRequest 
} from "matrix-js-sdk/lib/crypto/verification/request/VerificationRequest"
import { cryptoDomain } from "./domain"

export const onCancelVerificationRequest = cryptoDomain
    .event<VerificationRequest>()

