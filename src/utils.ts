import { MatrixEvent } from "matrix-js-sdk"
import { client } from "./matrix-client"
import {
    GetRoomAvatarParams,
    GetSenderAvatarParams
} from "./types"

export const getSenderAvatar = ({
    sender,
    width,
    height,
    resizeMethod,
    allowDefault = true,
    allowDirectLinks = false
}: GetSenderAvatarParams): string | null =>
    sender && sender.getAvatarUrl
        ? sender.getAvatarUrl(
            client().getHomeserverUrl(),
            width,
            height,
            resizeMethod,
            allowDefault,
            allowDirectLinks
        )
        : null

export const getRoomAvatarUrl = ({
    roomId,
    width,
    height,
    resizeMethod,
    allowDefault = true
}: GetRoomAvatarParams): string | null => {
    const room = client().getRoom(roomId)
    return room && room.getAvatarUrl
        ? room.getAvatarUrl(
            client().getHomeserverUrl(),
            width,
            height,
            resizeMethod,
            allowDefault
        )
        : null
}

export const checkIsDirect = (roomId: string): boolean => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const directEvent = client().getAccountData("m.direct") as MatrixEvent
    const aDirectRooms = directEvent
        ? Object.values(directEvent.getContent())
        : []
    let summaryDirects: string[] = []
    for (const accountDirects of aDirectRooms) {
        summaryDirects = [...summaryDirects, ...accountDirects]
    }
    if (summaryDirects.includes(roomId)) return true
    return false
} 
