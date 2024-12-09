
import api from "@/utils/axiosInstance";
import userStore from "@/stores/UserStore";
import { User } from "@/types/userTypes";

/**
 * Add new User to the system
 * 
 * @param {User} user 
 * @returns {User | undefined}
 */
export async function registerUser(user: User) {
    try {
        const fingerPrint = userStore.getFingerPrint();

        const userData = { ...user, fingerPrint };

        const response = await api.post("/auth/register", userData);

        console.log("Response: ", response, response.data.message);

        return response;
    } catch (error) {
        console.error("Axios Error Response: ", error);       
        
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