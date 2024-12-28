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
    timezone: string;
    language: string;
    deviceType: number;
    lastActive: string;
}