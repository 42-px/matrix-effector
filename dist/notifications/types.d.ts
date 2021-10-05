export declare type NotificationOverrideRuleId = ".m.rule.master" | ".m.rule.suppress_notices" | ".m.rule.invite_for_me" | ".m.rule.member_event" | ".m.rule.contains_display_name" | ".m.rule.tombstone" | ".m.rule.roomnotif";
export declare type NotificationUnderrideRuleId = ".m.rule.call" | ".m.rule.encrypted_room_one_to_one" | ".m.rule.room_one_to_one" | ".m.rule.message" | ".m.rule.encrypted";
export declare type NotificationContentRuleId = ".m.rule.contains_user_name";
export declare type NotificationAction = string | {
    set_tweak: "sound";
    value: string;
} | {
    set_tweak: "highlight";
    value: boolean;
};
export declare type NotificationRule<RuleType> = {
    actions: NotificationAction[];
    default: boolean;
    enabled: boolean;
    rule_id: RuleType;
};
export declare type NotificationKind = "override" | "underride" | "content" | "sender" | "room";
export declare type NotificationScope = "global" | "device";
export declare type NotificationRulesResult = {
    device: object;
    global: {
        override: NotificationRule<NotificationOverrideRuleId>[];
        underride: NotificationRule<NotificationUnderrideRuleId>[];
        content: NotificationRule<NotificationContentRuleId>[];
        room: NotificationRule<string>[];
        sender: NotificationRule<string>[];
    };
};
export declare type NotificationTweak = "sound" | "highlight";
export declare type SetNotificationsRuleParams = {
    scope: NotificationScope;
    kind: NotificationKind;
    ruleId: NotificationContentRuleId | NotificationUnderrideRuleId | NotificationOverrideRuleId | string;
    actions: (("notify" | "dont_notify" | "coalesce" | "set_tweak") | {
        set_tweak: NotificationTweak;
        value: string;
    })[];
};
export declare type SetNotificationsRuleEnabledParams = {
    scope: NotificationScope;
    kind: NotificationKind;
    ruleId: NotificationContentRuleId | NotificationUnderrideRuleId | NotificationOverrideRuleId | string;
    enabled: boolean;
};
export declare type DeleteNotificationsRuleEnabledParams = {
    scope: NotificationScope;
    kind: NotificationKind;
    ruleId: NotificationContentRuleId | NotificationUnderrideRuleId | NotificationOverrideRuleId | string;
};
