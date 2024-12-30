import { makeObservable, observable, action, runInAction } from "mobx";
import { ClientJS } from 'clientjs';
import { UserFingerPrint, User, ExternalUser } from '@/types/userTypes';
import { format } from "date-fns";

class UserStore {
    user: User = {
        name: "",
        email: "",
        password: "",
        terms: false,
    };
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
    externalUser: ExternalUser = {
        name: "",
        email: "",
        terms: false,
        photoUrl: "",
        isVerified: false,
    }

    constructor() {
        makeObservable(this, {
            user: observable, // User Type
            userFingerPrintData: observable, // UserFingerPrint Type
            externalUser: observable,

            // Actions
            getUser: action,
            setUser: action,
            getFingerPrint: action,
            getUserDetails: action,
            setExternalUser: action,
            getExternalUser: action,
        });
    }

    /**
     * Get User
     * 
     * @returns {Object}
     */
    getUser() {
        return this.user;
    }

    /**
     * set User Data
     * 
     * @param data 
     */
    setUser(data: Partial<User>) {
        runInAction(() => {
            this.user = {
                ...this.user, // Preserve existing data
                ...data, // Override with new data
            };
        });
    }

    /**
     * Get User's internal Browser information
     * 
     * @returns {Object}
     */
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

    getUserDetails() {
        return {
            user: this.user,
            userFingerPrintData: this.userFingerPrintData,
        }
    }

    setExternalUser(data: Partial<ExternalUser>) {
        runInAction(() => {
            this.externalUser = {
                ...this.externalUser,
                ...data,
            }
        });
    }

    getExternalUser() {
        return this.externalUser;
    }
}

const userStore = new UserStore();

export default userStore;