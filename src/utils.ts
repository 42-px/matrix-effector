import { TimelineWindow } from "matrix-js-sdk"
import { 
    DIRECT_EVENT, 
    ROOM_MESSAGE_EVENT, 
    ROOM_REDACTION_EVENT 
} from "./constants"
import { mergeMessageEvents } from "./mappers"
import { client } from "./matrix-client"
import {
    GetRoomMemberAvatarParams,
    GetSenderAvatarParams,
    MxcUrlToHttpParams
} from "./types"

export function getMessages(timelineWindow: TimelineWindow) {
    return timelineWindow
        .getEvents()
        .filter((event) => [ROOM_MESSAGE_EVENT, ROOM_REDACTION_EVENT]
            .includes(event.getType()))
        .reduce(mergeMessageEvents, [])
}

export const getSenderAvatarUrl = ({
    sender,
    width,
    height,
    resizeMethod,
    allowDefault = true,
    allowDirectLinks = false
}: GetSenderAvatarParams): string | null => (
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
)

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
        width,
        height,
        resizeMethod !== undefined ? resizeMethod : "scale",
        allowDirectLinks,
    )

export const getUploadCredentials = () => {
    return ({
        endpointUrl: `${client().getHomeserverUrl()}/_matrix/media/r0/upload`,
        headers: {
            Authorization : `Bearer ${client().getAccessToken()}`
        },
    })
}

export const setDirectRoom = async (
    roomId: string,
    companion?: string
): Promise<{}> => {
    const cl = client()
    const { creator } = cl.getRoom(roomId).currentState
        .getStateEvents(
            "m.room.create",
        )[0].getContent()
    const prevData = cl.getAccountData(DIRECT_EVENT).getContent()
    const prevRoomsId = prevData[creator] ?? []

    if(companion) {
        return await cl.setAccountData(DIRECT_EVENT, {
            ...prevData,
            [companion]: [roomId]
        })
        
    }
    return await cl.setAccountData(DIRECT_EVENT, {
        ...prevData,
        [creator]: [...prevRoomsId, roomId]
    })
}
