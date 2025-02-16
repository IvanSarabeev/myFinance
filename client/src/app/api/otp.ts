import api from "@/utils/axiosInstance";
import { BaseEmailVerification, ResponseEmailVerification } from "@/types/otp";
import { toErrorResponse } from "@/utils/errorInstance";
import { AxiosResponse } from "axios";

/**
 * Verify User's Email address by using OTP
 * 
 * @param {BaseEmailVerification} data: 
 * @returns {Promise<AxiosResponse<ResponseEmailVerification>>}
 */
export async function verifyEmail(data: BaseEmailVerification): Promise<AxiosResponse<ResponseEmailVerification>> {
    try {
        return await api.post("v1/otp/validate-email", data, { withCredentials: false });
    } catch (error: unknown) {
        throw toErrorResponse(error);
    }
}

/**
 * Send Confirmation Email to the User and provide OTP
 * 
 * @param {BaseEmailVerification} data: 
 * @returns {Promise<AxiosResponse<ResponseEmailVerification>>}
 */
export async function emailConfirmation(data: BaseEmailVerification): Promise<AxiosResponse<ResponseEmailVerification>> {
    try {
        return await api.post("v1/otp/email-confirmation", data, { withCredentials: false });
    } catch (error: unknown) {
        throw toErrorResponse(error);
    }
}