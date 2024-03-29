// Generated by dts-bundle-generator v6.0.0

import { EventType, IContent, ICreateClientOpts, ISendEventResponse, MatrixClient, MatrixEvent, PushRuleKind, Room, RoomMember, RoomSummary, SearchOrderBy, TimelineWindow, User } from 'matrix-js-sdk';

export declare enum MsgType {
	Audio = "m.audio",
	BadEncrypted = "m.bad.encrypted",
	Emote = "m.emote",
	File = "m.file",
	Image = "m.image",
	Notice = "m.notice",
	Text = "m.text",
	Video = "m.video",
	Location = "m.location"
}
export declare type Relation = {
	"m.in_reply_to"?: {
		event_id: string;
	};
};
export declare type TextContent = {
	body: string;
	msgtype: MsgType.Text;
	format: string;
	formatted_body: string;
	"m.relates_to"?: Relation;
	[customProperty: string]: any;
} | {
	body: string;
	msgtype: MsgType.Text;
	format?: undefined;
	formatted_body?: undefined;
	"m.relates_to"?: Relation;
	[customProperty: string]: any;
};
export declare type EmoteContent = {
	body: string;
	msgtype: MsgType.Emote;
	format: string;
	formatted_body: string;
	[customProperty: string]: any;
} | {
	body: string;
	msgtype: MsgType.Emote;
	format?: undefined;
	formatted_body?: undefined;
	[customProperty: string]: any;
};
export declare type NoticeContent = {
	body: string;
	msgtype: MsgType.Notice;
	format: string;
	formatted_body: string;
	"m.relates_to"?: Relation;
	[customProperty: string]: any;
} | {
	body: string;
	msgtype: MsgType.Notice;
	format?: undefined;
	formatted_body?: undefined;
	"m.relates_to"?: Relation;
	[customProperty: string]: any;
};
export declare type EncryptedFile = any;
export declare type ThumbnailInfo = {
	h: number;
	w: number;
	mimetype: string;
	size: number;
};
export declare type ImageInfo = {
	h: number;
	w: number;
	mimetype: string;
	size: number;
	thumbnail_url: string;
	thumbnail_file?: undefined;
	thumbnail_info: ThumbnailInfo;
} | {
	h: number;
	w: number;
	mimetype: string;
	size: number;
	thumbnail_url?: undefined;
	thumbnail_file: EncryptedFile;
	thumbnail_info: ThumbnailInfo;
};
export declare type ImageContent = {
	body: string;
	msgtype: MsgType.Image;
	info?: ImageInfo;
	url: string;
	file?: undefined;
	[customProperty: string]: any;
} | {
	body: string;
	msgtype: MsgType.Image;
	info?: ImageInfo;
	url?: undefined;
	file: EncryptedFile;
	[customProperty: string]: any;
};
export declare type FileInfo = {
	mimetype: string;
	size: number;
	thumbnail_url: string;
	thumbnail_file?: undefined;
	thumbnail_info: ThumbnailInfo;
} | {
	mimetype: string;
	size: number;
	thumbnail_url?: undefined;
	thumbnail_file: EncryptedFile;
	thumbnail_info: ThumbnailInfo;
};
export declare type FileContent = {
	body: string;
	msgtype: MsgType.File;
	filename?: string;
	info: FileInfo;
	url: string;
	file?: undefined;
	[customProperty: string]: any;
} | {
	body: string;
	msgtype: MsgType.File;
	filename?: string;
	info: FileInfo;
	url?: undefined;
	file: EncryptedFile;
	[customProperty: string]: any;
};
export declare type AudioInfo = {
	duration: number;
	mimetype: string;
	size: number;
};
export declare type AudioContent = {
	body: string;
	msgtype: MsgType.Audio;
	info?: AudioInfo;
	url: string;
	file?: undefined;
	[customProperty: string]: any;
} | {
	body: string;
	msgtype: MsgType.Audio;
	info?: AudioInfo;
	url?: undefined;
	file: EncryptedFile;
	[customProperty: string]: any;
};
export declare type LocationInfo = {
	thumbnail_url: string;
	thumbnail_file?: undefined;
	thumbnail_info: ThumbnailInfo;
} | {
	thumbnail_url?: undefined;
	thumbnail_file: EncryptedFile;
	thumbnail_info: ThumbnailInfo;
};
export declare type LocationContent = {
	body: string;
	msgtype: MsgType.Location;
	geo_uri: string;
	info?: LocationInfo;
	[customProperty: string]: any;
};
export declare type VideoInfo = {
	duration: number;
	h: number;
	w: number;
	mimetype: string;
	size: number;
	thumbnail_url: string;
	thumbnail_file?: undefined;
	thumbnail_info: ThumbnailInfo;
} | {
	duration: number;
	h: number;
	w: number;
	mimetype: string;
	size: number;
	thumbnail_url?: undefined;
	thumbnail_file: EncryptedFile;
	thumbnail_info: ThumbnailInfo;
};
export declare type VideoContent = {
	body: string;
	msgtype: MsgType.Video;
	info?: VideoInfo;
	url: string;
	file?: undefined;
	[customProperty: string]: any;
} | {
	body: string;
	msgtype: MsgType.Audio;
	info?: VideoInfo;
	url?: undefined;
	file: EncryptedFile;
	[customProperty: string]: any;
};
export declare type BadEncryptedContent = {
	body: string;
	msgtype: MsgType.BadEncrypted;
	[customProperty: string]: any;
};
export declare type MessageContent = AudioContent | BadEncryptedContent | EmoteContent | FileContent | ImageContent | NoticeContent | TextContent | VideoContent | LocationContent | Record<string, never>;
export declare enum Presence {
	online = "online",
	offline = "offline",
	unavailable = "unavailable"
}
export declare type MappedUser = Pick<User, "avatarUrl" | "userId" | "currentlyActive" | "displayName" | "lastActiveAgo" | "lastPresenceTs"> & {
	presence: Presence;
};
export interface EventPayload {
	event: MatrixEvent;
	room: Room;
}
export interface SearchRoomMessagesPayload {
	roomId: string;
	term: string;
	orderBy?: SearchOrderBy;
}
export declare type MessageEvent = {
	eventId: string;
	content: MessageContent;
	originServerTs: Date | null;
	roomId: string;
	sender: RoomMember;
	type: string;
	relatedEventId?: string;
	redaction: boolean;
	redacted: boolean;
	editing: boolean;
};
export declare type Message = {
	originalEventId: string;
	content: MessageContent;
	sender: RoomMember;
	originServerTs: Date | null;
	edited: boolean;
	redacted: boolean;
	seen?: boolean;
};
export declare enum MatrixMembershipType {
	leave = "leave",
	invite = "invite",
	ban = "ban",
	join = "join",
	knock = "knock"
}
export declare type MappedRoom = {
	roomId: string;
	name: string;
	summary: RoomSummary;
	myMembership: MatrixMembershipType | null;
};
export interface RoomWithActivity extends MappedRoom {
	unreadCount: number;
	lastMessage?: Message;
	isDirect: boolean;
	directUserId?: string;
	isOnline?: boolean;
	lastActivityTS: number;
	powerlevels: RoomPowerLevelsContent;
	myPowerLevel: number;
	canKick: boolean;
	canBan: boolean;
	canInvite: boolean;
	canSendEvents: {
		canChangeRoomAvatar: boolean;
		canChangeHistoryVisivility: boolean;
		canChangeRoomName: boolean;
		canChangeRoomPowerLevels: boolean;
		canChangeCanonicalAlias: boolean;
		canChangeRoomEncryption: boolean;
		canChangeRoomTobstone: boolean;
		canChangeRoomServerAcl: boolean;
	};
	canRedact: boolean;
}
export declare type EventListener = [
	string,
	(...args: any[]) => void
];
export declare type GetSenderAvatarParams = {
	sender: RoomMember;
	width: number;
	height: number;
	resizeMethod: "crop" | "scale";
	allowDefault?: boolean;
	allowDirectLinks?: boolean;
};
export declare type GetRoomMemberAvatarParams = {
	roomId: string;
	userId: string;
	width: number;
	height: number;
	resizeMethod: "crop" | "scale";
	allowDefault?: boolean;
};
export declare type RoomInfo = {
	roomMembersCount: number;
};
export declare type MxcUrlToHttpParams = {
	mxcUrl: string;
	width?: number;
	height?: number;
	resizeMethod?: "crop" | "scale";
	allowDirectLinks?: boolean;
};
export declare type CreateClientOptions = {
	options: ICreateClientOpts;
	messageBatchInterval?: number;
};
export declare type MatrixLoginPayload = {
	user_id: string;
	device_id: string;
	access_token: string;
	well_known?: string;
};
export declare type EventPowerLevels = {
	[EventType.RoomCanonicalAlias]: number;
	[EventType.RoomAvatar]: number;
	[EventType.RoomEncryption]: number;
	[EventType.RoomHistoryVisibility]: number;
	[EventType.RoomName]: number;
	[EventType.RoomPowerLevels]: number;
	[EventType.RoomServerAcl]: number;
	[EventType.RoomTombstone]: number;
};
export declare type RoomPowerLevelsContent = {
	ban: number;
	events: EventPowerLevels;
	users: {
		[key in string]: number;
	};
	redact: number;
	kick: number;
	invite: number;
	state_default: number;
	users_default: number;
	events_default: number;
};
export declare enum UserRole {
	admin = "Admin",
	moderator = "Moderator"
}
export interface LoginByPasswordParams {
	user: string;
	password: string;
}
export interface LoginByTokenParams {
	token: string;
	baseUrl: string;
}
export declare type StartClientParams = Parameters<MatrixClient["startClient"]>[0];
export declare type AuthData = {
	userId: string;
	deviceId: string;
	accessToken: string;
	wellKnown?: string;
};
export declare type CreateClientParams = {
	createClientParams: CreateClientOptions;
	startClientParams: StartClientParams;
};
export declare type StateEventsContent = IContent & {
	isDirect?: boolean;
};
export declare const onInitialSync: import("effector").Event<MappedRoom[]>;
export declare const onCachedState: import("effector").Event<MappedRoom[]>;
export declare const onSync: import("effector").Event<MappedRoom[]>;
export declare const createOnSyncThrottled: (ms: number) => import("effector").Event<MappedRoom[]>;
export declare const loginByPasswordFx: import("effector").Effect<LoginByPasswordParams, MatrixLoginPayload, Error>;
export declare const loginByTokenFx: import("effector").Effect<LoginByTokenParams, AuthData, Error>;
export declare const initStoreFx: import("effector").Effect<void, void, Error>;
export declare const startClientFx: import("effector").Effect<import("matrix-js-sdk").IStartClientOpts, void, Error>;
export declare const getLoggedUserFx: import("effector").Effect<void, MappedUser | null, Error>;
export declare const stopClientFx: import("effector").Effect<void, void, Error>;
export declare const logoutFx: import("effector").Effect<void, void, Error>;
export declare const createClientFx: import("effector").Effect<CreateClientParams, void, Error>;
export declare const destroyClientFx: import("effector").Effect<void, void, Error>;
export declare const getProfileInfoFx: import("effector").Effect<string, MappedUser, Error>;
export declare type NotificationOverrideRuleId = ".m.rule.master" | ".m.rule.suppress_notices" | ".m.rule.invite_for_me" | ".m.rule.member_event" | ".m.rule.contains_display_name" | ".m.rule.tombstone" | ".m.rule.roomnotif";
export declare type NotificationUnderrideRuleId = ".m.rule.call" | ".m.rule.encrypted_room_one_to_one" | ".m.rule.room_one_to_one" | ".m.rule.message" | ".m.rule.encrypted";
export declare type NotificationContentRuleId = ".m.rule.contains_user_name";
export declare type NotificationAction = string | {
	set_tweak: "sound";
	value: string;
} | {
	set_tweak: "highlight";
	value: boolean;
};
export declare type NotificationRule<RuleType> = {
	actions: NotificationAction[];
	default: boolean;
	enabled: boolean;
	rule_id: RuleType;
};
export declare type NotificationScope = "global" | "device";
export declare type NotificationRulesResult = {
	device: object;
	global: {
		override: NotificationRule<NotificationOverrideRuleId>[];
		underride: NotificationRule<NotificationUnderrideRuleId>[];
		content: NotificationRule<NotificationContentRuleId>[];
		room: NotificationRule<string>[];
		sender: NotificationRule<string>[];
	};
};
export declare type NotificationTweak = "sound" | "highlight";
export declare type SetNotificationsRuleParams = {
	scope: NotificationScope;
	kind: PushRuleKind;
	ruleId: NotificationContentRuleId | NotificationUnderrideRuleId | NotificationOverrideRuleId | string;
	actions: (("notify" | "dont_notify" | "coalesce" | "set_tweak") | {
		set_tweak: NotificationTweak;
		value: string;
	})[];
};
export declare type SetNotificationsRuleEnabledParams = {
	scope: NotificationScope;
	kind: PushRuleKind;
	ruleId: NotificationContentRuleId | NotificationUnderrideRuleId | NotificationOverrideRuleId | string;
	enabled: boolean;
};
export declare type DeleteNotificationsRuleEnabledParams = {
	scope: NotificationScope;
	kind: PushRuleKind;
	ruleId: NotificationContentRuleId | NotificationUnderrideRuleId | NotificationOverrideRuleId | string;
};
export declare const getNotificationRulesFx: import("effector").Effect<void, NotificationRulesResult, Error>;
export declare const setNotificationRuleActionFx: import("effector").Effect<SetNotificationsRuleParams, void, Error>;
export declare const setNotificationRuleEnabledFx: import("effector").Effect<SetNotificationsRuleEnabledParams, void, Error>;
export declare const deleteNotificationRuleFx: import("effector").Effect<DeleteNotificationsRuleEnabledParams, void, Error>;
export declare type InitRoomParams = {
	roomId: string;
};
export declare type LoadRoomFxParams = {
	roomId: string;
	timelineWindow: TimelineWindow;
	initialEventId?: string;
	initialWindowSize?: number;
	loadAdditionalDataDirection: "BACKWARD" | "FORWARD";
};
export declare type MappedRoomMember = Pick<RoomMember, "membership" | "name" | "powerLevel" | "powerLevelNorm" | "rawDisplayName" | "roomId" | "typing" | "userId"> & {
	user: MappedUser;
	role?: UserRole;
};
export declare type MessageResponse = {
	messages: Message[];
	isLive: boolean;
	canPaginateForward: boolean;
	canPaginateBackward: boolean;
};
export declare type LoadRoomParams = {
	initialEventId?: string;
	initialWindowSize?: number;
	loadAdditionalDataDirection?: "BACKWARD" | "FORWARD";
};
export declare type GoToMessageParams = {
	initialEventId: string;
	initialWindowSize?: number;
};
export interface CreateRoomParams {
	name: string;
	invite: string[];
	visibility: Visibility;
	initialState?: InitialState[];
	preset?: Preset;
}
export interface CreateDirectRoomParams {
	user: MappedUser;
	initialState?: InitialState[];
	preset?: Preset;
}
export declare enum Visibility {
	"public" = "public",
	"private" = "private"
}
export declare enum Preset {
	trustedPrivateChat = "trusted_private_chat",
	privateChat = "private_chat",
	publicChat = "public_chat"
}
export interface InitialState {
	content: Object;
	stateKey: string;
	type: string;
}
export declare type InviteUserParams = {
	roomId: string;
	userId: string;
};
export declare type InviteUsersParams = {
	roomId: string;
	usersIds: string[];
};
export declare type KickUserParams = {
	roomId: string;
	userId: string;
	reason?: string;
};
export declare type RenameRoomParams = {
	roomId: string;
	name: string;
};
export declare type RoomPowerLevels = {
	ban: number;
	kick: number;
	invite: number;
	defaultEvents: number;
	redact: number;
	stateDefault: number;
};
export declare type SendTypingParams = {
	roomId: string;
	isTyping: boolean;
};
export declare type RoomPermissions = {
	canInvite: boolean;
	canBan: boolean;
	canSendDefaultEvent: boolean;
	canRedact: boolean;
	canKick: boolean;
	canSetDefaultState: boolean;
};
export declare const DEFAULT_INVITE_POWERLEVEL = 50;
export declare const DEFAULT_BAN_POWERLEVEL = 50;
export declare const DEFAULT_KICK_POWERLEVEL = 50;
export declare const DEFAULT_SEND_DEFAULT_EVENT_POWERLEVEL = 0;
export declare const DEFAULT_SET_DEFAULT_STATE_POWERLEVEL = 50;
export declare const DEFAULT_REDACT_POWERLEVEL = 50;
export declare const $isLive: import("effector").Store<boolean | null>;
export declare const $loadRoomFxPending: import("effector").Store<boolean>;
export declare const $currentRoomMembers: import("effector").Store<MappedRoomMember[] | null>;
export declare const $currentRoomId: import("effector").Store<string | null>;
export declare const $currentRoom: import("effector").Store<RoomWithActivity | null>;
export declare const clearCurrentRoomState: import("effector").Event<void>;
export declare const $timelineWindow: import("effector").Store<TimelineWindow | null>;
export declare const $myPowerLevel: import("effector").Store<number>;
export declare const $typingMembers: import("effector").Store<{
	[x: string]: RoomMember[];
}>;
export declare const $requiredPowerLevelForKick: import("effector").Store<number>;
export declare const $requiredPowerLevelForInvite: import("effector").Store<number>;
export declare const $requiredPowerLevelForBan: import("effector").Store<number>;
export declare const $requiredPowerLevelForDefaultEvents: import("effector").Store<number>;
export declare const $requiredPowerLevelForRedact: import("effector").Store<number>;
export declare const $requiredPowerLevelForDefaultState: import("effector").Store<number>;
export declare const $currentJoinedRoomMembers: import("effector").Store<MappedRoomMember[]>;
export declare const $currentRoomInvitedMembers: import("effector").Store<MappedRoomMember[]>;
export declare const $canKick: import("effector").Store<boolean>;
export declare const $canInvite: import("effector").Store<boolean>;
export declare const $canBan: import("effector").Store<boolean>;
export declare const $canSendDefaultEvent: import("effector").Store<boolean>;
export declare const $canRedact: import("effector").Store<boolean>;
export declare const $canSetDefaultState: import("effector").Store<boolean>;
export declare const $loadFilter: import("effector").Store<boolean>;
export declare const clearTypingMember: import("effector").Event<void>;
export declare const toggleTypingUser: import("effector").Event<RoomMember>;
export declare const onRoomUserUpdate: import("effector").Event<User>;
export declare const onRoomMemberUpdate: import("effector").Event<RoomMember>;
export declare const getRoomMembers: import("effector").Event<void>;
export declare const initRoom: import("effector").Event<InitRoomParams>;
export declare const liveTimelineLoaded: import("effector").Event<void>;
export declare const onRoomInitialized: import("effector").Event<void>;
export declare const loadRoomMessageDone: import("effector").Event<void>;
export declare const onRoomLoaded: import("effector").Event<void>;
export declare const loadRoom: import("effector").Event<LoadRoomParams>;
export declare const toLiveTimeline: import("effector").Event<void>;
export declare const loadRoomMessage: import("effector").Event<GoToMessageParams>;
export declare const directRoomCreated: import("effector").Event<Room>;
export declare const roomCreated: import("effector").Event<Room>;
export declare const findDirectRoomByUserIdFx: import("effector").Effect<string, MappedRoom, Error>;
export declare const searchRoomMessagesFx: import("effector").Effect<SearchRoomMessagesPayload, Message[], Error>;
export declare const getRoomsWithActivitiesFx: import("effector").Effect<MappedRoom[], RoomWithActivity[], Error>;
export declare const getRoomInfoFx: import("effector").Effect<string, RoomInfo, Error>;
export declare const getAllUsersFx: import("effector").Effect<void, MappedUser[], Error>;
export declare const createRoomFx: import("effector").Effect<CreateRoomParams, {
	roomId: string;
}, Error>;
export declare const createDirectRoomFx: import("effector").Effect<CreateDirectRoomParams, {
	roomId: string;
}, Error>;
export declare const inviteUserFx: import("effector").Effect<InviteUserParams, void, Error>;
export declare const inviteUsersFx: import("effector").Effect<InviteUsersParams, void, Error>;
export declare const kickUserRoomFx: import("effector").Effect<KickUserParams, void, Error>;
export declare const renameRoomFx: import("effector").Effect<RenameRoomParams, void, Error>;
export declare const joinRoomFx: import("effector").Effect<{
	roomId: string;
	isDirect?: boolean | undefined;
}, RoomWithActivity, Error>;
export declare const leaveRoomFx: import("effector").Effect<string, void, Error>;
export declare const loadRoomFx: import("effector").Effect<LoadRoomFxParams, MessageResponse, Error>;
export declare const getRoomByIdFx: import("effector").Effect<string, RoomWithActivity | null, Error>;
export declare const sendTypingFx: import("effector").Effect<SendTypingParams, void, Error>;
export declare const getMembersByRoomIdFx: import("effector").Effect<string, MappedRoomMember[], Error>;
export declare const getRoomMemberFx: import("effector").Effect<{
	roomId: string;
	userId: string;
}, RoomMember, Error>;
export declare const getPermissionsByRoomIdFx: import("effector").Effect<string, RoomPermissions, Error>;
export interface PaginateRoomFxParams {
	roomId: string;
	timelineWindow: TimelineWindow;
	direction: "forward" | "backward";
	size: number;
	makeRequest?: boolean;
	requestLimit?: number;
}
export declare type PaginateParams = {
	size: number;
	makeRequest?: boolean;
	requestLimit?: number;
};
export interface DeleteMessageResult {
	eventId: string;
}
export interface UploadContentResult {
	promise: Promise<string | {
		content_uri: string;
	}>;
	abort?: () => void;
}
export interface UpdateMessagesFxParams {
	roomId: string;
	timelineWindow: TimelineWindow;
}
export interface CheckEventPermissionsParams {
	eventId: string;
	roomId: string;
}
export interface EventPermissions {
	canRedact: boolean;
	canEdit: boolean;
}
export interface SendMessagePayload {
	roomId: string;
	content: MessageContent;
	txnId?: string;
}
export interface EditMessagePayload {
	roomId: string;
	eventId: string;
	body: string;
	txnId?: string;
}
export interface DeleteMessagePayload {
	roomId: string;
	eventId: string;
	reason?: string;
}
export interface ReadAllMessagesParams {
	roomId: string;
	eventId: string;
}
export interface UploadContentParams {
	file: any;
	name?: string;
	includeFilename?: boolean;
	type?: string;
	onlyContentUri?: boolean;
	rawResponse?: boolean;
}
export interface UploadProgress {
	file: any;
	loaded: number;
	total: number;
}
export declare type UrlPreview = {
	"og:type"?: string;
	"og:url"?: string;
	"og:title"?: string;
	"og:image"?: string;
	"og:description"?: string;
	"og:site_name"?: string;
};
export declare const $messages: import("effector").Store<Message[]>;
export declare const $currentRoomUnreadMessageCount: import("effector").Store<number | null>;
export declare const updateMessages: import("effector").Event<void>;
export declare const roomMessage: import("effector").Event<Message>;
export declare const newMessagesLoaded: import("effector").Event<Message[]>;
export declare const onUploadProgress: import("effector").Event<UploadProgress>;
export declare const onPaginateBackwardDone: import("effector").Event<void>;
export declare const onPaginateForwardDone: import("effector").Event<void>;
export declare const paginateForward: import("effector").Event<PaginateParams>;
export declare const paginateBackward: import("effector").Event<PaginateParams>;
export declare const $paginateForwardPending: import("effector").Store<boolean>;
export declare const $paginateBackwardPending: import("effector").Store<boolean>;
export declare const $canPaginateBackward: import("effector").Store<boolean>;
export declare const $canPaginateForward: import("effector").Store<boolean>;
export declare const sendMessageFx: import("effector").Effect<SendMessagePayload, ISendEventResponse, Error>;
export declare const editMessageFx: import("effector").Effect<EditMessagePayload, ISendEventResponse, Error>;
export declare const deleteMessageFx: import("effector").Effect<DeleteMessagePayload, DeleteMessageResult, Error>;
export declare const readAllMessagesFx: import("effector").Effect<ReadAllMessagesParams, void, Error>;
export declare const checkEventPermissionsFx: import("effector").Effect<CheckEventPermissionsParams, EventPermissions, Error>;
export declare const uploadContentFx: import("effector").Effect<UploadContentParams, UploadContentResult, Error>;
export declare const getUrlPreviewFx: import("effector").Effect<{
	url: string;
	ts: number;
	timeout?: number | undefined;
}, UrlPreview, Error>;
export declare const updateDisplayNameFx: import("effector").Effect<string, void, Error>;
export declare const updateAvatarUrlFx: import("effector").Effect<string, void, Error>;
export declare const destroyClient: () => void;
export declare const createClient: ({ options, messageBatchInterval: ms }: CreateClientOptions) => void;
export declare const client: () => MatrixClient;
export declare const onClientEvent: (callbacks: EventListener[]) => void;
export declare const createRoomMessageBatch: () => import("effector").Event<Message[]>;
export declare const getSenderAvatarUrl: ({ sender, width, height, resizeMethod, allowDefault, allowDirectLinks }: GetSenderAvatarParams) => string | null;
export declare const getRoomMemberAvatarUrl: ({ roomId, userId, width, height, resizeMethod, allowDefault }: GetRoomMemberAvatarParams) => string | null;
export declare const mxcUrlToHttp: ({ mxcUrl, width, height, resizeMethod, allowDirectLinks, }: MxcUrlToHttpParams) => string | null;
export declare const getUploadCredentials: () => {
	endpointUrl: string;
	headers: {
		Authorization: string;
	};
};
export { Room, MatrixEvent, RoomMember, } from "matrix-js-sdk";

export {};
