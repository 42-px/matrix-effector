import { MatrixEvent, RoomMember, User } from "matrix-js-sdk"
import {
    Message,
    MessageEvent,
    Room,
    MappedRoom,
    RoomInfo,
    MessageContent,
    MappedRoomMember,
} from "./types"

function getMappedContent(event: MatrixEvent): MessageContent {
    const matrixContent = event.getContent() as MessageContent
    return {...matrixContent}
}

export function toMessageEvent(event: MatrixEvent): MessageEvent {
    const payload: MessageEvent = {
        eventId: event.getId(),
        // если есть клиентская агрегация, то этот метод отдает последний контент
        content: getMappedContent(event),
        originServerTs: event.getDate(),
        roomId: event.getRoomId(),
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
export function toMappedRoomMember(
    roomMember: RoomMember,
    user: User
): MappedRoomMember {
    return {
        membership: roomMember.membership,
        name: roomMember.name,
        powerLevel: roomMember.powerLevel,
        powerLevelNorm: roomMember.powerLevelNorm,
        rawDisplayName: roomMember.rawDisplayName,
        roomId: roomMember.roomId,
        typing: roomMember.typing,
        user: {
            avatarUrl: user.avatarUrl,
            userId : user.userId,
            currentlyActive :  user.currentlyActive,
            displayName :  user.displayName,
            lastActiveAgo :  user.lastActiveAgo,
            lastPresenceTs :  user.lastPresenceTs,
            presence: user.presence as any,
        },
        userId: roomMember.userId,
    }
}
