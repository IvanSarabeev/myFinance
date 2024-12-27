export interface EmailVerification {
    email: string;
    otpCode: number;
}

export interface ResponseEmailVerification {
    status: boolean;
    statusCode: number;
    otpMethod: string;
    message: string;
}