import { makeObservable, action, observable, runInAction } from "mobx";
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
            setLoading: action,
            verifyEmail: action,
        });
    }

    setLoading(state: boolean) {
        runInAction(() => {
            this.isLoading = state;
        });
    }

    async verifyEmail(data: EmailVerification) {
        this.setLoading(true);
        
        try {
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
           this.setLoading(false);
        };
    }
}

const otpStore = new OtpStore();

export default otpStore;