import { UserFingerPrint } from "./userTypes";

export type Role =  "user" | "moderator" | "admin"

export interface RegisterUserResponse {
    status: boolean;
    showModal: boolean;
    message: string;
    token?: string;
    errorFields?: string[];
}

export type LoginUserResponse = RegisterUserResponse & {
    data: {
        id: string;
        name: string;
        email: string;
        role: Role[];
        userAvatar: string;
        userFingerprint: UserFingerPrint;
        verified: boolean;
    };
}

export interface ExternalProviderResponse {
    status: boolean;
    message: string;
    token?: string;
    data: LoginUserResponse["data"];
}

export type AuthResponse = {
    status: boolean;
    message: string;
    errorFields?: string[];
    showRequestedModal: boolean;
}