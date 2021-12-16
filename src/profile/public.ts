import { d } from "./domain"

export const updateDisplayNameFx = d.effect<string, void, Error>()
export const updateAvatarUrlFx = d.effect<string, void, Error>()

