import { forward } from "effector"
import { User } from "matrix-js-sdk"
import { toMappedRoom, toMessage } from "@/mappers"
import { client, onClientEvent } from "@/matrix-client"
import { onRoomMemberUpdate, onRoomUserUpdate } from "@/room/private"
import { MatrixEvent, Room, RoomMember } from "@/types"
import {
    getLoggedUserFx,
    initStoreFx,
    loginByPasswordFx,
    loginByTokenFx,
    logoutFx,
    onCachedState,
    onInitialSync,
    onSync,
    startClientFx,
    stopClientFx
} from "./public"
import {
    LOGIN_BY_PASSWORD,
    LOGIN_BY_TOKEN,
    ROOM_MESSAGE_EVENT,
    ROOM_REDACTION_EVENT
} from "@/constants"
import { updateMessages } from "@/room-messages/private"
import { roomMessage } from "@/room-messages"

forward({
    from: loginByPasswordFx.done.map(() => ({ initialSyncLimit: 20 })),
    to: startClientFx,
})

function getMappedRooms() {
    return client().getRooms().map(toMappedRoom)
}

onClientEvent([
    [
        "Room.timeline",
        (
            event: MatrixEvent,
            room: Room,
            toStartOfTimeline: boolean,
            removed,
            data
        ) => {
            const eventType = event.getType()
            if (eventType === ROOM_MESSAGE_EVENT
                || eventType === ROOM_REDACTION_EVENT
            ) {
                if (!toStartOfTimeline && data.liveEvent) {
                    roomMessage(toMessage(event))
                }
            }
        }],
    ["Room.localEchoUpdated", () => updateMessages()],
    ["sync", (state, prevState) => {
        if (state === "PREPARED") {
            const rooms = getMappedRooms()
            onCachedState(rooms)
            return
        }
        if (state === "SYNCING" && prevState === "PREPARED") {
            const rooms = getMappedRooms()
            onInitialSync(rooms)
            return
        }
        if (state === "SYNCING" && prevState === "SYNCING") {
            const rooms = getMappedRooms()
            onSync(rooms)
            return
        }
    }],
    [
        "RoomState.members",
        (e, state, member: RoomMember) => onRoomMemberUpdate(member)
    ],
    [
        "RoomState.newMember",
        (e, state, member: RoomMember) => onRoomMemberUpdate(member)
    ],
    [
        "RoomMember.membership",
        (e, member: RoomMember) => onRoomMemberUpdate(member)
    ],
    [
        "RoomMember.name",
        (e, member: RoomMember) => onRoomMemberUpdate(member)
    ],
    [
        "RoomMember.powerLevel",
        (e, member: RoomMember) => onRoomMemberUpdate(member)
    ],
    [
        "RoomMember.typing",
        (e, member: RoomMember) => onRoomMemberUpdate(member)
    ],
    [
        "User.avatarUrl",
        (e, user: User) => onRoomUserUpdate(user)
    ],
    [
        "User.presence",
        (e, user: User) => onRoomUserUpdate(user)
    ],
    [
        "User.displayName",
        (e, user: User) => onRoomUserUpdate(user)
    ],
])

loginByPasswordFx.use((params) => client().login(LOGIN_BY_PASSWORD, params))

loginByTokenFx.use((params) => client().login(LOGIN_BY_TOKEN, params))

initStoreFx.use(async () => {
    const { store } = client()
    if (store) return store.startup()
})

startClientFx.use((params) => client().startClient(params))

logoutFx.use(() => client().logout())

stopClientFx.use(() => client().stopClient())

getLoggedUserFx.use(async () => {
    const cl = client()
    if (!cl) return null
    const loggedUserId = cl.getUserId()
    if (!loggedUserId) return null
    const user = cl.getUser(loggedUserId)
    if (!user) return null
    // FixMe: Необъяснимое поведение получения юзера через getUser
    // Аватар и дисплейнейм не приходят, и приходится получать 
    let avatarUrl = user.avatarUrl
    let displayName = user.displayName
    if (!user?.avatarUrl || !user?.displayName) {
        const profileInfo = await cl.getProfileInfo(loggedUserId)
        avatarUrl = profileInfo.avatar_url as string
        displayName = profileInfo.displayname as string
    }
    return {
        avatarUrl,
        userId: user.userId,
        currentlyActive: user.currentlyActive,
        displayName,
        lastActiveAgo: user.lastActiveAgo,
        lastPresenceTs: user.lastPresenceTs,
        presence: user.presence as any
    }
})
