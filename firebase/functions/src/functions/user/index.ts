// CONTEXT: User function exports. Firebase discovers functions by reading
// exports from index.ts. This barrel file groups all user-related functions.

export { getUser } from "./getUser/getUser.function";
export { updateUserProfile } from "./updateUserProfile/updateUserProfile.function";
