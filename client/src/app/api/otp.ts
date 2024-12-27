import api from "@/utils/axiosInstance";
import { EmailVerification, ResponseEmailVerification } from "@/types/otpTypes";
import { toErrorResponse } from "@/utils/errorInstance";
import { AxiosResponse } from "axios";

/**
 * Verify User's Email address by using OTP
 * 
 * @param {EmailVerification} data: 
 * @returns {Promise<AxiosResponse<ResponseEmailVerification>>}
 */
export async function verifyEmail(data: EmailVerification): Promise<AxiosResponse<ResponseEmailVerification>> {
    try {
        return await api.post("/otp/validate-email", data);
    } catch (error: unknown) {
        throw toErrorResponse(error);
    }
}