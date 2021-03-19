import { SearchResponse } from "matrix-js-sdk";
import { DeleteMessagePayload, DeleteMessageResult, EditMessagePayload, LoginByPasswordParams, LoginPayload, SearchMessageTextPayload, SendMessagePayload, Message, LoginByTokenParams, InitTimelineWindowParams, TimelineWindowPaginationParams, LoadTimelineWindowParams, ReadAllMessagesParams, RoomWithActivity, MappedRoom, RoomInfo } from "./types";
export declare const loginByPasswordFx: import("effector").Effect<LoginByPasswordParams, LoginPayload, Error>;
export declare const loginByTokenFx: import("effector").Effect<LoginByTokenParams, LoginPayload, Error>;
export declare const initStoreFx: import("effector").Effect<void, void, Error>;
export declare const startClientFx: import("effector").Effect<number | {
    initialSyncLimit?: number | undefined;
    includeArchivedRooms?: boolean | undefined;
    resolveInvitesToProfiles?: boolean | undefined;
    pendingEventOrdering?: string | undefined;
    pollTimeout?: number | undefined;
    filter?: import("matrix-js-sdk").Filter | undefined;
    disablePresence?: boolean | undefined;
    lazyLoadMembers?: boolean | undefined;
} | undefined, void, Error>;
export declare const stopClientFx: import("effector").Effect<void, void, Error>;
export declare const searchFx: import("effector").Effect<{
    next_batch?: string | undefined;
    body: import("matrix-js-sdk").SearchBody;
}, Message[], Error>;
export declare const searchMessageTextFx: import("effector").Effect<SearchMessageTextPayload, SearchResponse, Error>;
export declare const sendMessageFx: import("effector").Effect<SendMessagePayload, void, Error>;
export declare const editMessageFx: import("effector").Effect<EditMessagePayload, void, Error>;
export declare const deleteMessageFx: import("effector").Effect<DeleteMessagePayload, DeleteMessageResult, Error>;
export declare const getRoomTimelineFx: import("effector").Effect<string, Message[], Error>;
export declare const initTimelineWindowFx: import("effector").Effect<InitTimelineWindowParams, Message[], Error>;
export declare const getTimelineWindowMessagesFx: import("effector").Effect<void, Message[], Error>;
export declare const loadTimelineWindowFx: import("effector").Effect<LoadTimelineWindowParams, Message[], Error>;
export declare const paginateTimelineWindowFx: import("effector").Effect<TimelineWindowPaginationParams, Message[], Error>;
export declare const readAllMessagesFx: import("effector").Effect<ReadAllMessagesParams, void, Error>;
export declare const getRoomsWithActivitiesFx: import("effector").Effect<MappedRoom[], RoomWithActivity[], Error>;
export declare const getRoomInfoFx: import("effector").Effect<string, RoomInfo, Error>;
export declare const getLoggedUser: import("effector").Effect<void, Pick<import("matrix-js-sdk").User, "userId" | "currentlyActive" | "displayName" | "lastActiveAgo" | "lastPresenceTs" | "presence"> | null, Error>;
