import { d } from "./domain"
import { SessionInfo } from "./types"

export const logoutSessionsByIdFx = d
    .effect<SessionInfo["device_id"][], void, Error>()
