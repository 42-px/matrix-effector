import { PaginateParams } from "./types";
export declare const $paginateForwardPending: import("effector").Store<boolean>;
export declare const $paginateBackwardPending: import("effector").Store<boolean>;
export declare const $canPaginateBackward: import("effector").Store<boolean>;
export declare const $canPaginateForward: import("effector").Store<boolean>;
export declare const onPaginateBackwardDone: import("effector").Event<void>;
export declare const paginateForward: import("effector").Event<PaginateParams>;
export declare const paginateBackward: import("effector").Event<PaginateParams>;
