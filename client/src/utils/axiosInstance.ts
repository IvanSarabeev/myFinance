import axios from "axios";

const url = import.meta.env.VITE_CLIENT_NODE_ENV === "development"
    ? `${import.meta.env.VITE_BACKEND_URL}/api`
    : `${import.meta.env.VITE_RESERVER_BACKEND_URL}/api`;

const TSP_SECURITY = `${import.meta.env.VITE_STRICT_TSP}=${import.meta.env.VITE_STRICT_TSP_AGE}; ${import.meta.env.VITE_STRICT_TSP_DOM}`;
const X_OPTIONS = `${import.meta.env.VITE_X_PROTECTION_ONE}; ${import.meta.env.VITE_X_PROTECTION_TWO}=${import.meta.env.VITE_X_PROTECTION_THREE}`;

/**
 * Main Axios Instance
 */
const api = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": String(import.meta.env.VITE_CONTENT_TYPE),
        "X-Frame-Options": String(import.meta.env.VITE_X_OPTIONS),
        "X-XSS-Protection": String(X_OPTIONS),
        "X-Content-Type-Options": String(import.meta.env.VITE_X_CONTENT_OPTIONS),
        "Referrer-Policy": String(import.meta.env.VITE_REF_POLICY),
        "Strict-Transport-Security": String(TSP_SECURITY),
    },
    withCredentials: true,
});

api.interceptors.response.use((response) => {
    console.log("Axios Response: ", response);

    return response;
}, (error) => {
    if (error.response) {
        console.log(`Server error: ${error.response.data.message}`);

        return Promise.reject(error.response.data);
    }

    if (error.request) {
        console.error(`Server Down`);

        return Promise.reject({ message: "Under Maintaince" });
    }

    return Promise.reject({ message: "Unexpected error occured." });
});

export default api;