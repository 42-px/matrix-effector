import { MatrixEvent, RoomMember } from "matrix-js-sdk";
import { Message, MessageEvent, Room, MappedRoom, RoomInfo, MappedRoomMember } from "./types";
export declare function toMessageEvent(event: MatrixEvent): MessageEvent;
export declare function toMessage(event: MatrixEvent, originalEventId?: MatrixEvent["event"]["event_id"]): Message;
export declare function toMappedRoom(room: Room): MappedRoom;
export declare function mergeMessageEvents(acc: Message[], event: MatrixEvent): Message[];
export declare function toRoomInfo(room: Room): RoomInfo;
export declare function toMappedRoomMember(roomMember: RoomMember): MappedRoomMember;
