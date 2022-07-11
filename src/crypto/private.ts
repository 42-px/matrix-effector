import { cryptoDomain } from "./domain"

export const crossSigningChangeFx = cryptoDomain
    .effect<void, void, Error>()
