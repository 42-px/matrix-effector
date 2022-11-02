import { d } from "./domain"

export const confirmResetCrossSigningFx = d.effect<void, void, Error>()

export const onNeedAuth = d.event<void>()
