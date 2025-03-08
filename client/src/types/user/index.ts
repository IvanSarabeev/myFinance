export type Role =  "user" | "moderator" | "admin";

/**
 * User FingerPrint Model
 */
export interface UserFingerPrint {
    userAgent: string;
    browser: string;
    os: string;
    cpu: string;
    mobile: number;
    timeZone?: string;
    language: string;
    deviceType: number;
    lastActive: string;
};

/**
 * Base User Model
 */
export interface UserBase {
    id: string;
    name: string;
    email: string;
    role?: Role[];
    avatar?: string;
    terms?: boolean;
    verified?: boolean;
    blockedBy?: string[];
};

/**
 * Authentication through Website
 */
export interface InternalUser extends Omit<UserBase, "id"> {
    password: string;
    terms: boolean;
}

/**
 * Authentication through O/Auth | 3th party
 */
export interface ExternalUser extends Omit<UserBase, "id"> {
    photoUrl: string;
    isVerified: boolean;
    userFingerPrint: UserFingerPrint;
}

/**
 * User Details
 */
export interface UserDetails extends UserBase {
    userAvatar: string;
    userFingerprint: UserFingerPrint;
};

/**
 * For Forgotten password flow
 */
export interface UserForgottenPassword extends Pick<UserBase, "email"> {
    password?: string;
    confirm_password?: string;
}