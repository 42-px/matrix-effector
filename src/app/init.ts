import { forward } from "effector"
import {
    User,
    MatrixEvent,
    Room,
    RoomMember,
    EventType,
    UserTrustLevel,
} from "matrix-js-sdk"
import { DeviceInfo } from "matrix-js-sdk/lib/crypto/deviceinfo"

import { IdbDelete } from "@/idbHelper"
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
    onRoomMemberUpdate,
    onRoomUserUpdate,
    toggleTypingUser
} from "@/room"
import {
    initCryptoFx,
} from "@/crypto"
import {
    onVerificationRequest,
    MyVerificationRequest,
    onUpdateDeviceList,
    onUsersProfileUpdate,
} from "@/verification"
import { 
    onCrossSigningKeyChange, 
    onUpdateCrossSigningStatus
} from "@/cross-signing"
import { UserNotFound } from "@/errors"
import { onSessionRemaining } from "@/key-backup"

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
    $currentDeviceId,
    onUpdateKeyBackupStatus,
    onRoomMessage,
    directRoomCreated,
    roomCreated,
    messagesUpdated,
} from "./public"

$currentDeviceId
    .on(createClientFx.done, 
        (_, {params}) => params.createClientParams.options.deviceId)
    .reset(destroyClientFx.done)

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
                    onRoomMessage(toMessage(event))
                }
            }
        }],
    ["Session.logged_out", (args) => {
        console.log("Session.logged_out", args)
    }],
    // @TODO Реализовать. Этот эвент приходит когда логаут происходит из другой сессии.
    // cli.on(HttpApiEvent.SessionLoggedOut, function (errObj) {
    //     if (Lifecycle.isLoggingOut()) return;

    //     // A modal might have been open when we were logged out by the server
    //     Modal.closeCurrentModal('Session.logged_out');

    //     if (errObj.httpStatus === 401 && errObj.data && errObj.data['soft_logout']) {
    //         logger.warn("Soft logout issued by server - avoiding data deletion");
    //         Lifecycle.softLogout();
    //         return;
    //     }

    //     Modal.createDialog(ErrorDialog, {
    //         title: _t('Signed Out'),
    //         description: _t('For security, this session has been signed out. Please sign in again.'),
    //     });

    //     dis.dispatch({
    //         action: 'logout',
    //     });
    // });
    ["Room", (room: Room) => {
        const cl = client()
        const user = room.getMember(cl.getUserId())
        if (user && user.membership !== "invite") return

        const isDirect = Boolean(room.currentState
            .getStateEvents(
                EventType.RoomCreate,
                ""
            )?.getContent<StateEventsContent>()?.isDirect)

        if (isDirect) {
            directRoomCreated(room)
        } else {
            roomCreated(room)
        }
    }],
    ["Room.localEchoUpdated", () => messagesUpdated()],
    ["sync", async (state, prevState) => {
        if (state === "PREPARED") {
            const rooms = getMappedRooms()
            onCachedState(rooms)
            await client().uploadKeys()
            return
        }
        if (state === "SYNCING" && prevState === "PREPARED") {
            const rooms = getMappedRooms()
            onInitialSync(rooms)
            return
        }
        if (state === "SYNCING" && prevState === "SYNCING") {
            const rooms = getMappedRooms()
            messagesUpdated()
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
        (e, member: RoomMember) => {
            onRoomMemberUpdate(member)
            toggleTypingUser(member)
        }
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
    [
        "crossSigning.keysChanged", () => {
            onCrossSigningKeyChange()
            onUpdateCrossSigningStatus()
        }
    ],
    [
        "crypto.roomKeyRequest",
        (...args) => console.log("crypto.roomKeyRequest", args)
    ],
    [
        "crypto.roomKeyRequestCancellation",
        (...args) => console.log("crypto.roomKeyRequestCancellation", args)
    ],
    [
        "crypto.secrets.requestCancelled",
        (...args) => console.log("crypto.secrets.requestCancelled", args)
    ],
    [
        "crypto.suggestKeyRestore",
        (...args) => console.log("crypto.suggestKeyRestore", args)
    ],
    [
        "crypto.verification.request.unknown",
        (...args) => console.log("crypto.verification.request.unknown", args)
    ],
    [
        "crypto.verification.request", (
            request: MyVerificationRequest
        ) => {
            const cl = client()
            const deviceId = cl.getDeviceId()
            const userId = cl.getUserId()
            const isVerified = cl
                .checkDeviceTrust(userId, deviceId).isCrossSigningVerified()
            if (isVerified || request.isSelfVerification) {
                request.id = Date.now()
                onVerificationRequest(request)
            }
        }
    ],
    [
        "crypto.warning",
        (...args) => console.warn("crypto.warning", args)
    ],
    [
        "crypto.keyBackupStatus", () => {
            onUpdateKeyBackupStatus()
        }
    ],
    [
        "crypto.willUpdateDevices",
        (userIds: string[], initialFetch?: boolean) => {
            // If we didn't know about *any* devices before (ie. it's fresh login),
            // then they are all pre-existing devices, so ignore this and set the
            // devicesAtStart list to the devices that we see after the fetch.
            if (initialFetch) return
            onUpdateDeviceList(userIds)
            onUsersProfileUpdate(userIds)
        }
    ],
    ["crypto.devicesUpdated", (userIds: string[]) => {
        onUpdateDeviceList(userIds)
        onUsersProfileUpdate(userIds)
    }],
    ["deviceVerificationChanged", (
        userId: string,
        deviceId: string,
        deviceInfo: DeviceInfo
    ) => {
        onUpdateDeviceList([userId])
        onUsersProfileUpdate([userId])
    }],
    ["userTrustStatusChanged", (userId: string, newStatus: UserTrustLevel) => {
        onUpdateDeviceList([userId])
        onUsersProfileUpdate([userId])
        onUpdateCrossSigningStatus()
    }],
    ["crypto.keyBackupSessionsRemaining", onSessionRemaining],
    ["accountData", () => {
        onUpdateCrossSigningStatus()
    }]
])

loginByPasswordFx.use(async (params) =>
    await client().login(LOGIN_BY_PASSWORD, params))

loginByTokenFx.use(async (params): Promise<AuthData> => {
    const response = await fetch(
        `${params.baseUrl}/_matrix/client/r0/login`,
        {
            method: "POST",
            body: JSON.stringify({ type: LOGIN_BY_TOKEN, token: params.token })
        }
    )
    const {
        user_id,
        access_token,
        device_id,
        well_known
    } = await response.json()
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

logoutFx.use(async () => {
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
    const cl = client()
    const { store } = cl
    if (store) await store.startup()
    await initCryptoFx()
    await cl.downloadKeys([cl.getUserId() ?? createClientParams.options.userId])
    await cl.startClient(startClientParams)
})

destroyClientFx.use(async () => {
    const cl = client()
    if (!cl) return
    await IdbDelete("pickleKey", [cl.getUserId(), cl.getDeviceId()])
    await IdbDelete("account", "mx_access_token")
    cl.stopClient()
    await cl.logout()
    destroyClient()
})

getProfileInfoFx.use(async (userId) => {
    const cl = client()
    const user = cl.getUser(userId)
    if (!user) throw new UserNotFound()
    return toMappedUser(user)
})
