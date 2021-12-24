import {
    MatrixEvent,
    RoomMember,
    User,
    Room,
    EventType,
} from "matrix-js-sdk"
import {
    DIRECT_EVENT,
    ROOM_MESSAGE_EVENT,
    ROOM_REDACTION_EVENT
} from "./constants"
import { client } from "@/matrix-client"
import { RoomNotFound } from "./errors"
import { StateEventsContent } from "./app/types"
import { MappedRoomMember } from "./room"
import {
    Message,
    MessageEvent,
    MappedRoom,
    RoomInfo,
    MessageContent,
    MappedUser,
    RoomWithActivity,
    MatrixMembershipType,
    RoomPowerLevelsContent,
    UserRole,
    MsgType,
    ParsedMessageNodeTypes,
    ParsedMessageNode
} from "./types"

// eslint-disable-next-line max-len
const LINK_REG_EXP = /(^| )(?:[a-zA-Z][a-zA-Z0-9+-\.]*:(?:(?:\/\/(?:[a-zA-Z0-9-\._~%0-9A-Fa-f!\$&'\(\)\*\+,;=:]*@)?(?:\[(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:0?0?[0-9]|0?[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}(?:0?0?[0-9]|0?[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))|::(?:[0-9A-Fa-f]{1,4}:){5}(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:0?0?[0-9]|0?[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}(?:0?0?[0-9]|0?[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:0?0?[0-9]|0?[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}(?:0?0?[0-9]|0?[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:0?0?[0-9]|0?[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}(?:0?0?[0-9]|0?[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:0?0?[0-9]|0?[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}(?:0?0?[0-9]|0?[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:0?0?[0-9]|0?[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}(?:0?0?[0-9]|0?[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:0?0?[0-9]|0?[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}(?:0?0?[0-9]|0?[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|v[0-9A-Fa-f]+\.[a-zA-Z0-9-\._~!\$&'\(\)\*\+,;=:]+)\]|(?:(?:0?0?[0-9]|0?[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}(?:0?0?[0-9]|0?[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])|[a-zA-Z0-9-\._~%0-9A-Fa-f!\$&'\(\)\*\+,;=]{0,255})(?::[0-9]*)?(?:\/[a-zA-Z0-9-\._~%0-9A-Fa-f!\$&'\(\)\*\+,;=:@]*)*)|\/(?:[a-zA-Z0-9-\._~%0-9A-Fa-f!\$&'\(\)\*\+,;=:@]+(?:\/[a-zA-Z0-9-\._~%0-9A-Fa-f!\$&'\(\)\*\+,;=:@]*)*)?|[a-zA-Z0-9-\._~%0-9A-Fa-f!\$&'\(\)\*\+,;=:@]+(?:\/[a-zA-Z0-9-\._~%0-9A-Fa-f!\$&'\(\)\*\+,;=:@]*)*))(?:\?[a-zA-Z0-9-\._~%0-9A-Fa-f!\$&'\(\)\*\+,;=:@\/\?]*(?=#|$))?(?:#[a-zA-Z0-9-\._~%0-9A-Fa-f!\$&'\(\)\*\+,;=:@\/\?]*)?|(^| )[\w]{0,}\.[\w]{0,}\.(ru|com)|(^| )[\w]{0,}\.(ru|com)/gm
const MENTION_REG_EXP = /( |^)@\S{0,}/gm

export const toMessageSeen = (
    message: Message,
    myUserId: string,
    room: Room
): Message => {
    message.seen = room.getJoinedMembers().some((member) => {
        if (member.userId === myUserId) return false
        return room
            .hasUserReadEvent(member.userId, message.originalEventId)
    })
    return message
}

const getMappedContent = (event: MatrixEvent) => (
    event.getContent<MessageContent>()
)

export const getIsDirectRoomsIds = (): string[] => {
    const cl = client()
    const directRooms = cl.getAccountData(DIRECT_EVENT).getContent()
    return directRooms && Object.values(directRooms).flatMap((room) => room)
}

export const checkIsDirect = (roomId: string): boolean => (
    getIsDirectRoomsIds().includes(roomId))

export function toMessageEvent(event: MatrixEvent): MessageEvent {
    const payload: MessageEvent = {
        eventId: event.getId(),
        // если есть клиентская агрегация, то этот метод отдает последний контент
        content: getMappedContent(event),
        originServerTs: event.getDate(),
        roomId: event.getRoomId() as string,
        sender: event.sender,
        type: event.getType(),
        redaction: event.isRedaction(),
        redacted: event.isRedacted(),
        editing: Boolean(event.isRelation()),
    }
    if (event.hasAssocation()) {
        payload.relatedEventId = event.getAssociatedId()
    }
    return payload
}

const parseRegExpMatchAll = (
    regExp: RegExp, type: ParsedMessageNodeTypes, message: string
): {
    index: number
    content: string
    type: ParsedMessageNodeTypes
}[] =>  [...message.matchAll(regExp)].map((el) => {
    return {
        index: el.index ?? 0,
        type: type,
        content: el[0]
    }
})

export function toMessage(
    event: MatrixEvent,
    originalEventId?: MatrixEvent["event"]["event_id"]
): Message {
    const relation = event.getRelation()
    const content = getMappedContent(event)
    const message = content.body
    const parsedBody: ParsedMessageNode[] = []
    if (content.msgtype === MsgType.Text) {
        const findContent = [
            ...parseRegExpMatchAll(
                MENTION_REG_EXP, ParsedMessageNodeTypes.Mention, message
            ),
            ...parseRegExpMatchAll(
                LINK_REG_EXP, ParsedMessageNodeTypes.Link, message
            ),
        ].sort((a, b) => a.index - b.index)
        let prevIndex = 0
        if (!findContent.length) {
            parsedBody.push({
                type: ParsedMessageNodeTypes.String,
                content: message
            })
        } else {
            findContent.forEach((element) => {
                const prevText = message.substring(prevIndex, element.index)
                if (prevText.trim()) {
                    parsedBody.push({
                        type: ParsedMessageNodeTypes.String,
                        content: prevText
                    })
                }
                parsedBody.push({
                    type: element.type,
                    content: element.content.trim()
                })
                
                prevIndex = element.index + element.content.length
            })
        }
    }
    return {
        originalEventId: originalEventId !== undefined ?
            originalEventId :
            event.getId(),
        content,
        sender: event.sender,
        originServerTs: event.getDate(),
        edited: (relation as any)?.["rel_type"] === "m.replace",
        redacted: event.isRedacted() || event.isRedaction(),
        parsedBody: parsedBody,
    }
}

export function toMappedRoom(room: Room): MappedRoom {
    return {
        roomId: room.roomId,
        name: room.name,
        summary: room.summary,
        myMembership: room.getMyMembership() as MatrixMembershipType
    }
}

export function mergeMessageEvents(
    acc: Message[],
    event: MatrixEvent
): Message[] {
    if (event.isRelation("m.replace") || event.isRedaction()) {
        return acc
    }
    acc.push(toMessage(event))
    return acc
}

export function toRoomInfo(room: Room): RoomInfo {
    return {
        roomMembersCount: room.getJoinedMemberCount()
    }
}

export const toMappedUser = (user: User): MappedUser => (
    {
        avatarUrl: user.avatarUrl,
        userId: user.userId,
        currentlyActive: user.currentlyActive,
        displayName: user.displayName,
        lastActiveAgo: user.lastActiveAgo,
        lastPresenceTs: user.lastPresenceTs,
        presence: user.presence as any,
    }
)

export function toMappedRoomMember(
    roomMember: RoomMember,
    user: User
): MappedRoomMember {
    let role = undefined
    if (roomMember.powerLevel === 100) {
        role = UserRole.admin
    } else if (roomMember.powerLevel === 50) {
        role = UserRole.moderator
    }
    return {
        membership: roomMember.membership,
        name: roomMember.name,
        powerLevel: roomMember.powerLevel,
        powerLevelNorm: roomMember.powerLevelNorm,
        rawDisplayName: roomMember.rawDisplayName,
        roomId: roomMember.roomId,
        typing: roomMember.typing,
        user: toMappedUser(user),
        userId: roomMember.userId,
        role,
    }
}

export function toRoomWithActivity(
    room: MappedRoom, 
    maxHistory = 99
): RoomWithActivity {
    const cl = client()
    const matrixRoom = cl.getRoom(room.roomId)
    if (!matrixRoom) throw new RoomNotFound()
    const events = matrixRoom.getLiveTimeline().getEvents()
    const powerLevelsContent = matrixRoom.currentState
        .getStateEvents(EventType.RoomPowerLevels, "")
        .getContent<RoomPowerLevelsContent>()

    const isDirect = Boolean(matrixRoom.currentState
        .getStateEvents(
            EventType.RoomCreate, 
            ""
        )?.getContent<StateEventsContent>()?.isDirect)

    let unreadCount = 0
    for (let i = events.length - 1; i >= 0; i--) {
        if (i === events.length - maxHistory) break
        const event = events[i]
        const isReadUpTo = matrixRoom
            .hasUserReadEvent(cl.getUserId() as string, event.getId())
        if (isReadUpTo) {
            break
        }
        unreadCount += 1
    }
    const mergedMessageEvents = events
        .filter((event) => [ROOM_MESSAGE_EVENT, ROOM_REDACTION_EVENT]
            .includes(event.getType()))

    const lastEvent = mergedMessageEvents[mergedMessageEvents.length - 1]
    let lastMessage = lastEvent ? toMessage(lastEvent) : undefined
    const myUserId = cl.getUserId()

    if (lastMessage) {
        if (lastMessage.sender.userId !== myUserId) {
            lastMessage.seen = matrixRoom
                .hasUserReadEvent(myUserId, lastMessage.originalEventId) 
        } else {
            lastMessage = toMessageSeen(
                lastMessage,
                myUserId,
                matrixRoom
            )
        }
    }
    const DMUser = isDirect
        ? matrixRoom.getMember(matrixRoom.guessDMUserId())
        : null

    // Если у тебя нет прав в комнате, то тебя не будет в списке юзеров. 
    const myPowerLevel = powerLevelsContent.users[myUserId] ?? 0
    return {
        ...room,
        unreadCount,
        lastMessage,
        isDirect,
        directUserId: DMUser?.userId,
        // ToDo: Разобраться, почему у для некоторых юзеров не прилетает объект user в DMUSER
        // Гипотеза 1: Шифрованные чаты как-то с этим могут быть связаны
        isOnline: DMUser
            ? Boolean(DMUser.user?.currentlyActive)
            : undefined,
        lastActivityTS: (matrixRoom as any).getLastActiveTimestamp(),
        powerlevels: powerLevelsContent,
        myPowerLevel,
        canBan: myPowerLevel >= powerLevelsContent.ban,
        canKick: myPowerLevel >= powerLevelsContent.kick,
        canInvite: myPowerLevel >= powerLevelsContent.invite,
        canRedact: myPowerLevel >= powerLevelsContent.redact,
        canSendEvents: {
            canChangeHistoryVisivility: (
                myPowerLevel >= powerLevelsContent
                    .events[EventType.RoomHistoryVisibility]
            ),
            canChangeRoomAvatar: (
                myPowerLevel >= powerLevelsContent.events[EventType.RoomAvatar]
            ),
            canChangeRoomName: (
                myPowerLevel >= powerLevelsContent.events[EventType.RoomName]
            ),
            canChangeRoomPowerLevels: (
                myPowerLevel >= powerLevelsContent
                    .events[EventType.RoomPowerLevels]
            ),
            canChangeCanonicalAlias: (
                myPowerLevel >= powerLevelsContent
                    .events[EventType.RoomCanonicalAlias]
            ),
            canChangeRoomEncryption: (
                myPowerLevel >= powerLevelsContent
                    .events[EventType.RoomEncryption]
            ),
            canChangeRoomServerAcl: (
                myPowerLevel >= powerLevelsContent
                    .events[EventType.RoomServerAcl]
            ),
            canChangeRoomTobstone: (
                myPowerLevel >= powerLevelsContent
                    .events[EventType.RoomTombstone]
            )
        }
    }
}
