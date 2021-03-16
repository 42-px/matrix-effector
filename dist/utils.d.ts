import { GetRoomMemberAvatarParams, GetSenderAvatarParams } from "./types";
export declare const getSenderAvatar: ({ sender, width, height, resizeMethod, allowDefault, allowDirectLinks }: GetSenderAvatarParams) => string | null;
export declare const getRoomMemberAvatar: ({ roomId, userId, width, height, resizeMethod, allowDefault }: GetRoomMemberAvatarParams) => string | null;
export declare const checkIsDirect: (roomId: string) => boolean;
