import { client } from "./matrix-client"
import { GetSenderAvatarParams } from "./types"

export const getSenderAvatar = ({
    sender,
    width,
    height,
    resizeMethod,
    allowDefault = true,
    allowDirectLinks = false
}: GetSenderAvatarParams) =>
    sender.getAvatarUrl(
        client().getHomeserverUrl(),
        width,
        height,
        resizeMethod,
        allowDefault,
        allowDirectLinks
    )
