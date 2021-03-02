import { GetRoomAvatarParams, GetSenderAvatarParams } from "./types";
export declare const getSenderAvatar: ({ sender, width, height, resizeMethod, allowDefault, allowDirectLinks }: GetSenderAvatarParams) => string | null;
export declare const getRoomAvatarUrl: ({ roomId, width, height, resizeMethod, allowDefault }: GetRoomAvatarParams) => string | null;
export declare const checkIsDirect: (roomId: string) => boolean;
