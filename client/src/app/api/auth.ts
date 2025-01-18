
import api from "@/utils/axiosInstance";
import userStore from "@/stores/UserStore";
import { AxiosResponse } from "axios";

// Types
import { GithubUser, GoogleUser, LoginUser, User } from "@/types/userTypes";
import { ExternalProviderResponse, LoginUserResponse, RegisterUserResponse } from "@/types/authTypes";

/**
 * Add new User to the system
 * 
 * @param {User} user 
 * @returns {Promise<AxiosResponse<RegisterUserResponse>>}
 * @throws {Error}
 */
export async function registerUser(user: User): Promise<AxiosResponse<RegisterUserResponse>> {
    const fingerPrint = userStore.getFingerPrint();
    const data = { ...user, fingerPrint };

    try {
        return await api.post("/auth/register", data, { withCredentials: false });
    } catch (error) {
        console.error("API RESPONSE:", error);
        throw error;
    }
};

/**
 * Authenticated existing User to the system
 * 
 * @param {LoginUser} user 
 * @returns {Promise<AxiosResponse<LoginUserResponse>>}
 * @throws {Error}
 */
export async function loginUser(user: LoginUser): Promise<AxiosResponse<LoginUserResponse>> {
    try {
        return await api.post("/auth/login", user, { withCredentials: false });
    } catch (error) {
        console.error("API RESPONSE:", error);
        throw error;
    }
}

/**
 * Logout User from the system
 * 
 * @returns {Promise<void>}
 */
export async function logoutUser(): Promise<void> {
    try {
        return await api.post("/auth/logout", {}, { withCredentials: false });
    } catch (error) {
        console.error("API RESPONSE", error);

        throw error;
    }
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

/**
 * Authenticate/Register User
 * 
 * @param {Object} data 
 * @returns {Promise<AxiosResponse<ExternalProviderResponse>>}
 */
export async function google(data: GoogleUser): Promise<AxiosResponse<ExternalProviderResponse>> {
    try {
        return await api.post("/auth/google-login", data);
    } catch (error) {
        console.error("API RESPONSE:", error);
        throw error;
    }
}

/**
 * Authenticate/Register User
 * 
 * @param {Object} data 
 * @returns {Promise<AxiosResponse<ExternalProviderResponse>>}
 */
export async function github(data: GithubUser): Promise<AxiosResponse<ExternalProviderResponse>> {
    try {
        return await api.post("/auth/github-login", data);
    } catch (error) {
        console.error("API RESPONSE:", error);
        throw error;
    }
}