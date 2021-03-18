import { GetRoomMemberAvatarParams, GetSenderAvatarParams } from "./types";
export declare const getSenderAvatarUrl: ({ sender, width, height, resizeMethod, allowDefault, allowDirectLinks }: GetSenderAvatarParams) => string | null;
export declare const getRoomMemberAvatarUrl: ({ roomId, userId, width, height, resizeMethod, allowDefault }: GetRoomMemberAvatarParams) => string | null;
export declare const checkIsDirect: (roomId: string) => boolean;
