export interface User {
    name: string;
    email: string;
    password: string;
    terms: boolean;
}

export interface RegisterResponse {
    data: {
        status: boolean;
        showModal: boolean;
        message: string;
        token?: string;
        errorFields?: string[];
    },
    status: number;
}

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