export {
    Room,
    LoginPayload,
    MatrixEvent,
    RoomMember,
} from "matrix-js-sdk"
export * from "./app"
export * from "./notifications"
export * from "./room"
export * from "./room-messages"
export * from "./room-pagination"
export * from "./types"
export * from "./matrix-client"
export {
    checkIsDirect,
    getRoomMemberAvatarUrl,
    getSenderAvatarUrl,
    getUploadCredentials,
    mxcUrlToHttp,
} from "./utils"

import "./init"

console.log("updated matrix effector")
