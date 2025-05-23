import { makeObservable, action, observable, runInAction } from "mobx";
import { verifyEmail, emailConfirmation } from "@/app/api/otp";
import { HTTP_RESPONSE_STATUS, OTP_EMAIL_TYPE } from "@/defines";
import commonStore from "./CommonStore";
import modalStore from "./ModalStore";
import { NOTIFICATION_TYPES } from "@/types/defaults";
import { BaseEmailVerification } from "@/types/otp";
import { ApiErrorResponse } from "@/types/defaultApi";
import sessionStore from "./SessionStore";

class OtpStore {
    otpCode: string = "";
    isVerified: boolean = false;
    isLoading: boolean = false;
    error: ApiErrorResponse | null = null;

    constructor() {
        makeObservable(this, {
            otpCode: observable,
            isVerified: observable,
            isLoading: observable,
            error: observable,
            setLoading: action,
            verifyEmail: action,
            setOtpCode: action,
            clearData: action,
            emailConfirmation: action,
        });
    }

    setLoading(state: boolean) {
        runInAction(() => {
            this.isLoading = state;
        });
    }

    async verifyEmail(data: BaseEmailVerification) {
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
                        modalStore.closeModal();
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

    setOtpCode(otpValue: string) {
        this.otpCode = otpValue;
    }

    clearData() {
        this.otpCode = "";
        this.isVerified = false;
        this.error = null;
    }

    /**
     * Confirm User's email and their OTP Code
     * 
     * @param {BaseEmailVerification} data -  
     * @returns 
     */
    async emailConfirmation(data: BaseEmailVerification) {
        this.setLoading(true);

        try {
            const response = await emailConfirmation(data);

            runInAction(() => {
                const { status, message } = response.data;
                
                if (status && response.status === HTTP_RESPONSE_STATUS.OK) {
                    sessionStore.setForgottenPasswordFlow(String(status));                    
                    
                    commonStore.openNotification(
                        NOTIFICATION_TYPES.SUCCESS,
                        NOTIFICATION_TYPES.SUCCESS.toLocaleUpperCase(),
                        message
                    );

                    modalStore.closeModal();
                } else {
                    this.isVerified = false;
                    
                    commonStore.openNotification(
                        NOTIFICATION_TYPES.DESTRUCTIVE,
                        NOTIFICATION_TYPES.ERROR.toLocaleUpperCase(),
                        message
                    );
                }
            });
                
                return response;
        } catch (error) {
            console.error(`Fatal Error: ${error}`);

            throw error;
        }
    }
}

const otpStore = new OtpStore();

export default otpStore;