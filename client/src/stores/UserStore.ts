import { makeObservable, observable, action } from "mobx";
import { ClientJS } from 'clientjs';
import { UserFingerPrint, UserSignUpData } from '@/types/userTypes';
import { format } from "date-fns";

class UserStore {
    user:UserSignUpData = {
        name: "",
        email: "",
        password: "",
        terms: false,
    }
    userFingerPrintData: UserFingerPrint = {
        userAgent: "",
        browser: "",
        os: "",
        cpu: "",
        mobile: NaN,
        timezone: "",
        language: "",
        deviceType: NaN,
        lastActive: "",
    };

    constructor() {
        makeObservable(this, {
            user: observable, // User Model
            userFingerPrintData: observable,

            setUser: action,
            getUser: action,
            getFingerPrint: action,
        });
    }

    getUser() {
        return this.user;
    }

    setUser(data: Partial<UserSignUpData>) {
        this.user = {
            ...this.user, // Preserve existing data
            ...data, // Override with new data
        };
    }

    getFingerPrint() {
        const client = new ClientJS();
        const todayDate = new Date;
        const formattedDate = format(todayDate, `yyyy-MM-dd HH:mm:ss`);

        return {
            userAgent: client.getUserAgent(),
            browser: client.getBrowser(),
            os: client.getOS(),
            cpu: client.getCPU(),
            mobile: client.isMobile() ? 0 : 1,
            deviceType: client.isMobile() ? 0 : 1,
            timeZone: client.getTimeZone(),
            language: client.getLanguage(),
            lastActive: formattedDate,
        }
    }
}

const userStore = new UserStore();

export default userStore;