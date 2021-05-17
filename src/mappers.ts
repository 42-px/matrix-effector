import { MatrixEvent } from "matrix-js-sdk"
import {
    Message,
    MessageEvent,
    Room,
    MappedRoom,
    RoomInfo,
    MessageContent,
    MsgType,
} from "./types"

function getMappedContent(event: MatrixEvent): MessageContent {
    const matrixContent = event.getContent() as MessageContent
    if (!matrixContent.body) return {}
    const content: any = {
        body: matrixContent.body,
        msgtype: matrixContent.msgtype
    }
    if (matrixContent.msgtype === MsgType.BadEncrypted) return content
    if (matrixContent["m.relates_to"]) {
        content["m.relates_to"] = {...matrixContent["m.relates_to"]}
    }
    if (matrixContent.msgtype === MsgType.Text ||
        matrixContent.msgtype === MsgType.Emote ||
        matrixContent.msgtype === MsgType.Notice
    ) {
        if (matrixContent.format) content.format = matrixContent.format
        if (matrixContent.formatted_body) {
            content.formatted_body = matrixContent.formatted_body
        }
        return content
    }
    if (matrixContent.msgtype === MsgType.Location) {
        if (matrixContent.geo_uri) content.geo_uri = matrixContent.geo_uri
        if (matrixContent.info) content.info = matrixContent.info
        return content
    }
    if (matrixContent.file) content.file = matrixContent.file
    if (matrixContent.url) content.url = matrixContent.url
    if (matrixContent.info) content.info = {...matrixContent.info}
    return content
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
