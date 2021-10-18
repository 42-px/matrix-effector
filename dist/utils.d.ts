import { TimelineWindow } from "matrix-js-sdk";
import { GetRoomMemberAvatarParams, GetSenderAvatarParams, MxcUrlToHttpParams } from "./types";
export declare function getMessages(timelineWindow: TimelineWindow): import("./types").Message[];
export declare const getSenderAvatarUrl: ({ sender, width, height, resizeMethod, allowDefault, allowDirectLinks }: GetSenderAvatarParams) => string | null;
export declare const getRoomMemberAvatarUrl: ({ roomId, userId, width, height, resizeMethod, allowDefault }: GetRoomMemberAvatarParams) => string | null;
export declare const getIsDirectRoomsIds: () => string[];
export declare const mxcUrlToHttp: ({ mxcUrl, width, height, resizeMethod, allowDirectLinks, }: MxcUrlToHttpParams) => string | null;
export declare const checkIsDirect: (roomId: string) => boolean;
export declare const getUploadCredentials: () => {
    endpointUrl: string;
    headers: {
        Authorization: string;
    };
};
export declare const setDirectRoom: (roomId: string) => Promise<void>;
