import { EventType, Room, TimelineWindow } from "matrix-js-sdk"
import { client } from "./matrix-client"
import { RoomNotFound } from "./errors"
import { 
    DIRECT_EVENT, 
    ROOM_MESSAGE_EVENT, 
    ROOM_REDACTION_EVENT 
} from "./constants"
import {
    mergeMessageEvents,
    toMessageSeen
} from "./mappers"
import {
    GetRoomMemberAvatarParams,
    GetSenderAvatarParams,
    MxcUrlToHttpParams,
    Message,
} from "./types"

export function getMessages(timelineWindow: TimelineWindow): Message[] {
    const messages = timelineWindow.getEvents()
        .filter((event) => (
            [
                ROOM_MESSAGE_EVENT,
                ROOM_REDACTION_EVENT
            ].includes(event.getType())))
        .reduce(mergeMessageEvents, [])
    const cl = client()
    const roomId = timelineWindow.getEvents()[0].getRoomId()
    const room = cl.getRoom(roomId as string)
    if (!room) throw new RoomNotFound()
    const myMessages = []
    const otherMessages = []
    const myUserId = cl.getUserId()
    let findFirstSeenOtherMessage = false
    let findFirstSeenMyMessage = false
    for (let i = messages.length - 1; i >= 0; i--) {
        if (messages[i].sender.userId === myUserId) {
            myMessages.push(messages[i])
        } else {
            otherMessages.push(messages[i])
        }
    }
    myMessages.forEach((message) => {
        if (findFirstSeenMyMessage) {
            message.seen = true
        } else {
            message = toMessageSeen(message, myUserId, room)
            findFirstSeenMyMessage = Boolean(message.seen)
        }
    })
    otherMessages.forEach((message) => {
        if (findFirstSeenOtherMessage) {
            message.seen = true
        } else {
            message.seen = room
                .hasUserReadEvent(myUserId, message.originalEventId)
            findFirstSeenOtherMessage = message.seen
        }
    })
    return messages
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
    const room = client().getRoom(roomId)
    if (!room) throw new RoomNotFound(`Room ${roomId} not found`)
    const { creator } = room.currentState
        .getStateEvents(
            EventType.RoomCreate,
            ""
        ).getContent()
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
