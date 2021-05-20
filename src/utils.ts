import { MatrixEvent } from "matrix-js-sdk"
import { client } from "./matrix-client"
import {
    GetRoomMemberAvatarParams,
    GetSenderAvatarParams,
    MxcUrlToHttpParams
} from "./types"

export const getSenderAvatarUrl = ({
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

export const getRoomMemberAvatarUrl = ({
    roomId,
    userId,
    width,
    height,
    resizeMethod,
    allowDefault = true
}: GetRoomMemberAvatarParams): string | null => {
    const room = client().getRoom(roomId)
    if (!room) {
        return null
    }
    const otherMember = room.getMember(userId)
    if (!otherMember) {
        return null
    }
    return otherMember.getAvatarUrl(
        client().getHomeserverUrl(),
        width,
        height,
        resizeMethod,
        allowDefault,
        true
    )
}

export const mxcUrlToHttp = ({
    mxcUrl,
    width,
    height,
    resizeMethod,
    allowDirectLinks,
}: MxcUrlToHttpParams): string | null => 
    client().mxcUrlToHttp(
        mxcUrl,
        width !== undefined ? width : null,
        height !== undefined ? height : null,
        resizeMethod !== undefined ? resizeMethod : "scale",
        allowDirectLinks !== undefined ? allowDirectLinks : null,
    )

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
