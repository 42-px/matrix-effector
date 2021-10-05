import { client } from "@/matrix-client"
import {
    getNotificationRulesFx,
    setNotificationRuleActionFx,
    setNotificationRuleEnabledFx,
    deleteNotificationRuleFx
} from "./public"
import { NotificationRulesResult, SetNotificationsRuleParams } from "./types"

getNotificationRulesFx.use(() => {
    return client().getPushRules() as Promise<NotificationRulesResult>
})

setNotificationRuleActionFx.use(async (payload: SetNotificationsRuleParams) => {
    try {
        await client().setPushRuleActions(
            payload.scope, 
            payload.kind, 
            payload.ruleId, 
            // FixMe: Если в будущем в matrix-js-sdk пофиксят
            // типы - убрать as any
            payload.actions as any
        )
    } catch (err) {
        console.error("Error while setNotificationRuleAction.Fx")
        console.error(err)
        throw err
    }
})

setNotificationRuleEnabledFx.use(async (payload) => {
    try {
        console.error("Getting push rules...")
        const rules = await client().getPushRules() as any
        console.error(rules.global.room)
        await client().setPushRuleEnabled(
            payload.scope,
            payload.kind,
            payload.ruleId,
            payload.enabled
        )
    } catch (err) {
        console.error("Error while setNotificationRuleEnabled")
        console.error(err)
    }
})

deleteNotificationRuleFx.use(async(payload) => {
    await client().deletePushRule(
        payload.scope,
        payload.kind,
        payload.ruleId
    )
})
