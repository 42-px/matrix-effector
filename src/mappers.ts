import { MatrixEvent } from "matrix-js-sdk"
import {
    Message,
    MessageEvent,
    Room,
    MappedRoom,
    RoomInfo,
    MessageContent,
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
    return {
        originalEventId: originalEventId !== undefined ?
            originalEventId :
            event.getId(),
        content: getMappedContent(event),
        sender: event.sender,
        originServerTs: event.getDate(),
        edited: Boolean(event.replacingEventId()),
        redacted: event.isRedacted(),
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
