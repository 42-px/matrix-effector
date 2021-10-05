import { TimelineWindow } from "matrix-js-sdk";
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
