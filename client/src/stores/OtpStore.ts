import { makeObservable, action, observable } from "mobx";
import { verifyEmail } from "@/app/api/otp";
import { HTTP_RESPONSE_STATUS, OTP_EMAIL_TYPE } from "@/defines";

// Stores
import commonStore from "./CommonStore";

// Types
import { NOTIFICATION_TYPES } from "@/types/commonTypes";
import { EmailVerification } from "@/types/otpTypes";
import { ApiErrorResponse } from "@/types/utilTypes";

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
                            NOTIFICATION_TYPES.SUCCESS.toLocaleUpperCase(),
                            message
                        );
                    }
                } else {
                    this.isVerified = false;
                    
                    commonStore.openNotification(
                        NOTIFICATION_TYPES.DESTRUCTIVE,
                        NOTIFICATION_TYPES.ERROR.toLocaleUpperCase(),
                        message
                    );
                }
            }

            return response;
        } catch (error: unknown) {
            this.error = error as ApiErrorResponse;

            const message = String(this.error.response?.message ?? this.error.message);
            
            commonStore.openNotification(
                NOTIFICATION_TYPES.DESTRUCTIVE,
                NOTIFICATION_TYPES.ERROR.toLocaleUpperCase(),
                message
            );

            throw error;
        } finally {
            this.isLoading = false;
        };
    }
}

const otpStore = new OtpStore();

export default otpStore;