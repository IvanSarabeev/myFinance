export interface User {
    name: string;
    email: string;
    password: string;
    terms: boolean;
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
    timezone?: string;
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