/* notification pushrules types */
import { PushRuleKind } from "matrix-js-sdk/lib/@types/PushRules";

export type NotificationOverrideRuleId =
    ".m.rule.master" |
    ".m.rule.suppress_notices" | 
    ".m.rule.invite_for_me" | 
    ".m.rule.member_event" |
    ".m.rule.contains_display_name" | 
    ".m.rule.tombstone" | 
    ".m.rule.roomnotif"
  
export type NotificationUnderrideRuleId = 
    ".m.rule.call" |
    ".m.rule.encrypted_room_one_to_one" |
    ".m.rule.room_one_to_one" |
    ".m.rule.message" |
    ".m.rule.encrypted" 

export type NotificationContentRuleId = 
    ".m.rule.contains_user_name" 

export type NotificationAction = string | {
    set_tweak: "sound"
    value: string 
} | {
    set_tweak: "highlight"
    value: boolean
}

export type NotificationRule<RuleType> = {
    actions: NotificationAction[]
    default: boolean
    enabled: boolean
    rule_id: RuleType
}

export type NotificationScope = "global" | "device"

export type NotificationRulesResult = {
    device: object
    global: {
        override: NotificationRule<NotificationOverrideRuleId>[]
        underride: NotificationRule<NotificationUnderrideRuleId>[]
        content: NotificationRule<NotificationContentRuleId>[]
        room: NotificationRule<string>[] /* rule_id -> roomId */
        sender: NotificationRule<string>[] /* rule_id -> sender_id */
    }
}

export type NotificationTweak = "sound" | "highlight"

export type SetNotificationsRuleParams = {
    scope: NotificationScope
    kind: PushRuleKind
    ruleId: 
        NotificationContentRuleId |
        NotificationUnderrideRuleId | 
        NotificationOverrideRuleId |
        string
    actions: (("notify" | "dont_notify" | "coalesce" | "set_tweak") | {
        set_tweak: NotificationTweak
        value: string
    })[]
}

export type SetNotificationsRuleEnabledParams = {
    scope: NotificationScope
    kind: PushRuleKind
    ruleId: 
        NotificationContentRuleId | 
        NotificationUnderrideRuleId | 
        NotificationOverrideRuleId |
        string
    enabled: boolean
}


export type DeleteNotificationsRuleEnabledParams = {
    scope: NotificationScope
    kind: PushRuleKind
    ruleId: 
        NotificationContentRuleId | 
        NotificationUnderrideRuleId | 
        NotificationOverrideRuleId |
        string
}
