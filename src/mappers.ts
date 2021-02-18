import { MatrixEvent } from "matrix-js-sdk"
import {
    Message,
    MessageEvent,
    Room,
    MappedRoom,
} from "./types"
import { client } from "./matrix-client"
import { ROOM_MESSAGE_EVENT, ROOM_REDACTION_EVENT } from "./constants"

export function toMessageEvent(event: MatrixEvent): MessageEvent {
    const payload: MessageEvent = {
        eventId: event.getId(),
        // если есть клиентская агрегация, то этот метод отдает последний контент
        content: event.getContent(),
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
        content: event.getContent(),
        sender: event.sender,
        originServerTs: event.getDate(),
        edited: Boolean(event.replacingEventId()),
        redacted: event.isRedacted(),
    }
}

export function toMappedRoom(room: Room): MappedRoom {
    const maxHistory = 99
    const events = room.getLiveTimeline().getEvents()
    let unreadCount = 0
    const cl = client()
    for (let i = events.length - 1; i >= 0; i--) {
        if (!cl) break
        if (i === events.length - maxHistory) break
        const event = events[i]
        if (room.hasUserReadEvent(cl.getUserId() as string, event.getId())) {
            break
        }
        unreadCount += 1
    }
    const mergedMessageEvents = events
        .filter((event) => [ROOM_MESSAGE_EVENT, ROOM_REDACTION_EVENT]
            .includes(event.getType()))
        .reduce(mergeMessageEvents, [])
    const lastMessage = mergedMessageEvents.length ?
        mergedMessageEvents[mergedMessageEvents.length - 1] : undefined
    return {
        roomId: room.roomId,
        name: room.name,
        summary: room.summary,
        unreadCount,
        lastMessage
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
