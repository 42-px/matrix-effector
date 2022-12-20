import { client } from "@/matrix-client"
import { forward, guard } from "effector"
import { IAuthData } from "matrix-js-sdk"

import { createInteractiveAuthFx } from "@/interactive-auth"
import { onUpdateDeviceList } from "@/verification"

import { logoutSessionsByIdFx } from "./private"
import { 
    updateDisplayNameFx, 
    updateAvatarUrlFx, 
    getMySessionsFx,
    $mySessionsInfo,
    clearMySessionsInfo,
    logoutSessionsById,
    renameDeviceFx,
} from "./public"

$mySessionsInfo
    .on(getMySessionsFx.doneData, (_, sessionsInfo) => sessionsInfo)
    .reset([getMySessionsFx.fail, clearMySessionsInfo])

forward({
    from: logoutSessionsById,
    to: logoutSessionsByIdFx
})

guard({
    clock: onUpdateDeviceList,
    filter: $mySessionsInfo.map((sessions) => Boolean(sessions)),
    target: getMySessionsFx,
})

updateDisplayNameFx.use(async (newDisplayName) => {
    await client().setDisplayName(newDisplayName)
})

updateAvatarUrlFx.use(async (newAvatarUrl) => {
    await client().setAvatarUrl(newAvatarUrl)
})

getMySessionsFx.use(async () => {
    const cl = client()
    const {devices} = await cl.getDevices()
    const crossSigningInfo = cl.getStoredCrossSigningForUser(cl.getUserId())
    const myDeviceId = cl.getDeviceId()
    return devices.map((device) => {
        const deviceInfo = cl.getStoredDevice(cl.getUserId(), device.device_id)
        let isVerified = false
        // @TODO В devices может прийти такой девайс, по которому мы не можем получить инфу
        // и getStoredDevice отдает null
        if (deviceInfo) {
            isVerified = crossSigningInfo.checkDeviceTrust(
                crossSigningInfo,
                deviceInfo,
                false,
                true,
            ).isCrossSigningVerified()
        }

        return {
            ...device,
            isVerified,
            isCurrentSession: device.device_id === myDeviceId 
        }
    })
})

logoutSessionsByIdFx.use(async (sessionsId) => {
    const cl = client()
    const callback = async (auth: IAuthData) => {
        await cl.deleteMultipleDevices(sessionsId, auth)
        return auth
    }
    await createInteractiveAuthFx(callback)
    await callback
})

renameDeviceFx.use(async ({deviceId, newDisplayName}) => {
    await client().setDeviceDetails(deviceId, {
        display_name: newDisplayName,
    })
})
