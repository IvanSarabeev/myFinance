import { Role } from "./authTypes";

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

export interface InternalUser extends UserBase {
    password: string;
    terms: boolean;
}

// Change it to ExternalUser
export interface ExternalUser2 extends UserBase {
    avatar: string;
    isVerified: boolean;
    fingerPrint: UserFingerPrint;
}

export type UserOriginal = InternalUser | ExternalUser;

export interface User {
    name: string;
    email: string;
    password: string;
    terms: boolean;
}

export interface UserDetails extends UserBase {
    userAvatar: string;
    userFingerprint: UserFingerPrint;
}

export type LoginUser = Omit<User, "name" | "terms">;
export type RegisterUser = Required<User>;
export type PartialUser = Partial<User>;

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
}

interface ExternalApiProvider {
    email: string | null;
    name: string | null;
    photo: string | null;
    fingerPrint: UserFingerPrint,
}

export type GoogleUser = Required<ExternalApiProvider>;
export type GithubUser = Required<ExternalApiProvider>;

export interface ExternalUser {
    name: string;
    email: string;
    terms: boolean;
    photoUrl: string;
    isVerified: boolean;
}

export type ForgottenPassword = {
    email: string;
    password?: string;
    confirm_password?: string;
};