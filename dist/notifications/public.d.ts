import { DeleteNotificationsRuleEnabledParams, NotificationRulesResult, SetNotificationsRuleEnabledParams, SetNotificationsRuleParams } from "./types";
export declare const getNotificationRulesFx: import("effector").Effect<void, NotificationRulesResult, Error>;
export declare const setNotificationRuleActionFx: import("effector").Effect<SetNotificationsRuleParams, void, Error>;
export declare const setNotificationRuleEnabledFx: import("effector").Effect<SetNotificationsRuleEnabledParams, void, Error>;
export declare const deleteNotificationRuleFx: import("effector").Effect<DeleteNotificationsRuleEnabledParams, void, Error>;
