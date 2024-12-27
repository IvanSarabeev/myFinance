
import api from "@/utils/axiosInstance";
import userStore from "@/stores/UserStore";
import { AxiosResponse } from "axios";
import { RegisterResponse, User } from "@/types/userTypes";

/**
 * Add new User to the system
 * 
 * @param {User} user 
 * @returns {User | undefined}
 * @throws {Error}
 */
export async function registerUser(user: User): Promise<AxiosResponse<RegisterResponse>> {
    const fingerPrint = userStore.getFingerPrint();
    const data = { ...user, fingerPrint };

    try {
        return await api.post("/auth/register", data);
    } catch (error) {
        console.error("API RESPONSE:", error);
        throw error;
    }
};

/**
 * Authenticated existing User to the system
 * 
 * @param {User} user 
 * @returns {User | undefined}
 */
export async function loginUser(user: User): Promise<User | undefined> {
    if (!user) {
        console.error(`Invalid ${user}!`);
        throw new Error(`Invalid ${user}!`);
    }

    return user;
};

/**
 * Logout User from the system
 * 
 * @returns {void}
 */
export async function logoutUser() {
    const response = api.post("./api/auth/logout");

    return response;
};

/**
 * Reset User password
 * 
 * @param user 
 * @returns 
 */
export async function forgottenUserPassword(user: Partial<User>): Promise<Partial<User>> {
    if (!user) {
        console.error(`Invalid ${user}!`);
        throw new Error(`Invalid ${user}!`);
    }

    return user;
}