import { d } from "./domain"

export const getCrossSigningIdFx = d.effect<void, string, Error>()
