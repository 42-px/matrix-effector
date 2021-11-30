import { forward } from "effector"
import {
    User,
    MatrixEvent,
    Room,
    RoomMember,
} from "matrix-js-sdk"
import {
    toMappedRoom,
    toMappedUser,
    toMessage
} from "@/mappers"
import {
    client,
    createClient,
    destroyClient,
    onClientEvent,
} from "@/matrix-client"
import {
    LOGIN_BY_PASSWORD,
    LOGIN_BY_TOKEN,
    ROOM_MESSAGE_EVENT,
    ROOM_REDACTION_EVENT
} from "@/constants"
import {
    roomMessage,
    updateMessages
} from "@/room-messages"
import {
    directRoomCreated,
    roomCreated,
    onRoomMemberUpdate,
    onRoomUserUpdate,
    toggleTypingUser
} from "@/room"
import { MatrixLoginPayload } from "@/types"
import { UserNotFound } from "@/errors"
import {
    AuthData,
    StateEventsContent
} from "./types"
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
    stopClientFx,
    createClientFx,
    destroyClientFx,
    getProfileInfoFx,
} from "./public"

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
        const user = room.getMember(cl.getUserId())
        if (user && user.membership !== "invite") return

        const isDirect = room.currentState
            .getStateEvents(
                "m.room.create"
            )[0]?.getContent<StateEventsContent>()?.isDirect
               
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
        (e, member: RoomMember) => toggleTypingUser(member)
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

loginByPasswordFx.use( async (params) =>
    await client().login(LOGIN_BY_PASSWORD, params))

loginByTokenFx.use(async (params): Promise<AuthData> => {
    const response = await fetch(
        `${params.baseUrl}/_matrix/client/r0/login`,
        { 
            method: "POST", 
            body: JSON.stringify({type: LOGIN_BY_TOKEN, token: params.token }) 
        }
    )
    const { 
        user_id,
        access_token,
        device_id,
        well_known
    }: MatrixLoginPayload = await response.json()
    return { 
        userId: user_id, 
        accessToken: access_token,
        deviceId: device_id,
        wellKnown: well_known
    }
})

initStoreFx.use(async () => {
    const { store } = client()
    if (store) return store.startup()
})

startClientFx.use((params) => client().startClient(params))

logoutFx.use( async () => {
    await client().logout()
})

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

createClientFx.use(async (
    {
        createClientParams,
        startClientParams
    }
) => {
    createClient(createClientParams)
    const { store } = client()
    if (store) await store.startup()
    await client().startClient(startClientParams)
})

destroyClientFx.use(async () => {
    const cl = client()
    if (!cl) return
    await cl.logout() 
    await cl.store?.deleteAllData()
    cl.stopClient()
    destroyClient()
})

getProfileInfoFx.use( async (userId) => {
    const cl = client()
    const user = cl.getUser(userId)
    if (!user) throw new UserNotFound()
    return toMappedUser(user)
})
