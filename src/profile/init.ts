import { updateAvatarUrlFx } from "."
import { client } from "../matrix-client"
import { updateDisplayNameFx } from "./public"

updateDisplayNameFx.use(async (newDisplayName) => {
    await client().setDisplayName(newDisplayName)
})

updateAvatarUrlFx.use(async (newAvatarUrl) => {
    await client().setAvatarUrl(newAvatarUrl)
})

