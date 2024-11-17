import axios from "axios";
import userStore from "@/stores/UserStore";
import { UserSignUpData } from "@/types/userTypes";

export const registerUser = async (user: UserSignUpData): Promise<UserSignUpData> => {
    try {
        const fingerPrint = userStore.getFingerPrint();

        const { name, email, password, terms } = user;

        const userData = { name, email, password, terms, fingerPrint };

        const response = await axios.post("/api/auth/register", userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // const response = fetch("/api/auth/register", {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(userData)
        // });

        console.log(response);

        // if (!(await response).ok) {
        //     throw new Error(`Status: ${(await response).status}`);
        // }

        const data = await response.data();

        console.log(response, data);

        // if (!resultResponse) {
        //     throw new Error(`Fatal Error: ${resultResponse}`);
        // }
        
        return data;
    } catch (error) {
        console.error(error);       
        
        throw error;
    }
};