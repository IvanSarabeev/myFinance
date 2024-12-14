import { makeObservable, action } from "mobx";
import { verifyEmailOtp } from "@/app/api/otp";
import commonStore from "./CommonStore";

class OtpStore {
    constructor() {
        makeObservable(this, {
            verifyEmailOtp: action,
        })
    }

    // TODO: Continue the implementation..
    async verifyEmailOtp(email: string, otpCode: number) {
        return await verifyEmailOtp({email, otpCode}).then((response) => {           
            commonStore.showLoader();
            
            if (!response) {
                return Promise.reject(Error(response));
            }

            // if (response.data.otpMethod === "001") {}

            return Promise.resolve(response);
        }).finally(() => {
            commonStore.hideLoader();
        })
    }
}

const otpStore = new OtpStore();

export default otpStore;