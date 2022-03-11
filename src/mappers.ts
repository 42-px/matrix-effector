import {
    MatrixEvent,
    RoomMember,
    User,
    Room,
    EventType
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
    UserRole
} from "./types"

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

export function toMessage(
    event: MatrixEvent,
    originalEventId?: MatrixEvent["event"]["event_id"]
): Message {
    const relation = event.getRelation()
    return {
        originalEventId: originalEventId !== undefined ?
            originalEventId :
            event.getId(),
        content: getMappedContent(event),
        sender: event.sender,
        originServerTs: event.getDate(),
        edited: (relation as any)?.["rel_type"] === "m.replace",
        redacted: event.isRedacted() || event.isRedaction(),
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
