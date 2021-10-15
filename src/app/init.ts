import { forward } from "effector"
import { EventType, User } from "matrix-js-sdk"
import { toMappedRoom, toMappedUser, toMessage } from "@/mappers"
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
import { directRoomCreated, roomCreated } from "@/room"

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
    ["Room", (room: Room) => {
        const cl = client()
        const user = room.getMember(cl.getUserId() as string)
        if (user && user.membership !== "invite") return

        const isDirect = (room.currentState
            .getStateEvents(
                "m.room.create" as EventType, 
                undefined as any
            ) as any)[0]?.getContent()?.isDirect

        if (isDirect) {
            directRoomCreated(room)
        } else {
            roomCreated(room)
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
    const mappedUser = toMappedUser(user)
    // FixMe: Необъяснимое поведение получения юзера через getUser
    // Аватар и дисплейнейм не приходят, и приходится получать 
    if (!mappedUser.avatarUrl || !mappedUser.displayName) {
        const profileInfo = await cl.getProfileInfo(loggedUserId)
        mappedUser.avatarUrl = profileInfo.avatar_url as string
        mappedUser.displayName = profileInfo.displayname as string
    }
    return mappedUser
})
