import { createCustomError } from "@42px/custom-errors"

export const EventNotFound = createCustomError("EventNotFound")
export const RoomNotFound = createCustomError("RoomNotFound")
export const ClientNotInitialized = createCustomError("ClientNotInitialized")
export const TimelineWindowUndefined = 
  createCustomError("TimelineWindowUndefined")
export const UserNotFound = createCustomError("UserNotFound")
export const UserNotLoggedIn = createCustomError("UserNotLoggedIn")
export const CantInviteUsers = 
  createCustomError("Can't invite users into a direct room")
export const NotEnoughPermissions = 
  createCustomError("Not enough permissions to invite users")
