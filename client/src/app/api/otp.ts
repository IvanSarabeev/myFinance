import api from "@/utils/axiosInstance";

type EmailOTP = {
    email: string,
    otpCode: number,
}

export async function verifyEmailOtp(data: EmailOTP) {
    try {
        const response = await api.post("/otp/validate-email", data);

        // TODO: Continue Implementation

        return response;
        console.log(response);
    } catch (error) {
        console.error(`Fatal:`, error);
    }
}