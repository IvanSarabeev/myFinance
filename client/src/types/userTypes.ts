export interface UserSignUpData {
    name: string;
    email: string;
    password: string;
    terms: boolean;
}

export interface ApiResponse {
    status: boolean,
    statusCode: number;
    token: string;
    message: string;
}

export interface UserApiResponse extends ApiResponse {
    userData: UserSignUpData;
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