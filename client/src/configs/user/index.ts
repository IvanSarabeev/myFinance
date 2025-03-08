export type Role =  "user" | "moderator" | "admin";

/**
 * List of available User roles
 */
export const UserRoles = {
    USER: "user",
    MODERATOR: "moderator",
    ADMIN: "admin",
} as const;