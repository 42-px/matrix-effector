import { notificationDomain } from "./domain"
import {
    DeleteNotificationsRuleEnabledParams,
    NotificationRulesResult,
    SetNotificationsRuleEnabledParams,
    SetNotificationsRuleParams
} from "./types"

export const getNotificationRulesFx = notificationDomain
    .effect<void, NotificationRulesResult, Error>()
export const setNotificationRuleActionFx = notificationDomain
    .effect<SetNotificationsRuleParams, void, Error>()
export const setNotificationRuleEnabledFx = notificationDomain
    .effect<SetNotificationsRuleEnabledParams, void, Error>()
export const deleteNotificationRuleFx = notificationDomain
    .effect<DeleteNotificationsRuleEnabledParams, void, Error>()
