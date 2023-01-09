import { createCustomError } from "@42px/custom-errors"

export const EventNotFound = createCustomError("EventNotFound")
export const RoomNotFound = createCustomError("RoomNotFound")
export const ClientNotInitialized = createCustomError("ClientNotInitialized")
export const TimelineWindowUndefined = 
  createCustomError("TimelineWindowUndefined")
export const UserNotFound = createCustomError("UserNotFound")
export const UserNotLoggedIn = createCustomError("UserNotLoggedIn")
export const CantInviteUsers = 
  createCustomError("CantInviteUsers")
export const NotEnoughPermissions = 
  createCustomError("NotEnoughPermissions")
export const InvalidBackupInfo = createCustomError("InvalidBackupInfo")
