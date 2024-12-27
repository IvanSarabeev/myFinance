import { makeObservable, action, observable } from "mobx";
import { verifyEmail } from "@/app/api/otp";
import { EmailVerification } from "@/types/otpTypes";
import { ApiErrorResponse } from "@/types/utilTypes";
import { HTTP_RESPONSE_STATUS, OTP_EMAIL_TYPE } from "@/defines";
import commonStore from "./CommonStore";
import { NOTIFICATION_TYPES } from "@/types/commonTypes";

class OtpStore {
    isVerified = false;
    isLoading = false;
    error: ApiErrorResponse | null = null;

    constructor() {
        makeObservable(this, {
            isVerified: observable,
            isLoading: observable,
            error: observable,

            // Actions
            verifyEmail: action,
        });
    }

    async verifyEmail(data: EmailVerification) {
        this.isLoading = true;
        this.error = null;
        
        try {
            this.isLoading = true;
            const response = await verifyEmail(data);

            if (response) {
                const { status, otpMethod, message } = response.data;

                if (response.status === HTTP_RESPONSE_STATUS.OK) {
                    if (status && otpMethod === OTP_EMAIL_TYPE) {
                        this.isVerified = true;
                        
                        commonStore.openNotification(
                            NOTIFICATION_TYPES.SUCCESS,
                            "Success",
                            message
                        );
                    }
                } else {
                    console.log("Im getting here on error", response);
                    this.isVerified = false;
                    
                    commonStore.openNotification(
                        NOTIFICATION_TYPES.DESTRUCTIVE,
                        "Error",
                        message
                    );
                }
                
                console.log("Store Response: ", response);
            }

            return response;
        } catch (error: unknown) {
            this.error = error as ApiErrorResponse;

            const message = String(this.error.response?.message ?? this.error.message);
            
            commonStore.openNotification(NOTIFICATION_TYPES.DESTRUCTIVE, "Error", message);

            throw error;
        } finally {
            this.isLoading = false;
        };
    }
}

const otpStore = new OtpStore();

export default otpStore;