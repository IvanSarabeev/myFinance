import { verifyEmailOtp } from "@/app/api/otp";
import { makeObservable } from "mobx";
import commonStore from "./CommonStore";

class OtpStore {
    constructor() {
        makeObservable(this, {

        })
    }

    // TODO: Continue the implementation..
    verifyEmailOtp(email: string, otpCode: number) {
        return verifyEmailOtp({email, otpCode}).then((response) => {           
            commonStore.showLoader();
            
            if (!response) {
                return Promise.reject(response);
            } 

            return Promise.resolve(response);
        }).finally(() => {
            commonStore.hideLoader();
        })
    }
}

const otpStore = new OtpStore();

export default otpStore;