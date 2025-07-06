import { HTTP_RESPONSE_STATUS } from "@/defines";
import { commonStore } from "@/stores";
import { NOTIFICATION_TYPES } from "@/types/defaults";
import axios, {AxiosRequestConfig} from "axios";

const url = import.meta.env.VITE_CLIENT_NODE_ENV === "development"
    ? `${import.meta.env.VITE_BACKEND_URL}/api`
    : `${import.meta.env.VITE_RESERVER_BACKEND_URL}/api`;

const TSP_SECURITY = `${import.meta.env.VITE_STRICT_TSP}=${import.meta.env.VITE_STRICT_TSP_AGE}; ${import.meta.env.VITE_STRICT_TSP_DOM}`;
const X_OPTIONS = `${import.meta.env.VITE_X_PROTECTION_ONE}; ${import.meta.env.VITE_X_PROTECTION_TWO}=${import.meta.env.VITE_X_PROTECTION_THREE}`;

/**
 * Initialize a request with an option to decline it
 *
 * @param {AxiosRequestConfig} config - Axios Configuration
 * @returns {[Promise, AbortController]} - Return array with Promise and AbortController
 */
export const createCancellableRequest = <T>(config: AxiosRequestConfig): [Promise<T>, AbortController] => {
    const controller = new AbortController();
    const request = api({
            ...config,
        signal: controller.signal,
    }).then(response => response.data);

    return [request, controller] as const;
};

/**
 * Configured Axios instance for making HTTP requests with predefined settings.
 *
 * The instance is created with the following configuration:
 * - `baseURL`: Base URL for the API.
 * - `headers`: HTTP headers to be included with each request:
 *    - `Content-Type`: Content type of the request, derived from the environment variable ` VITE_CONTENT_TYPE `.
 *    - `X-Frame-Options`: Frame options header, derived from environment variable `VITE_X_OPTIONS`.
 *    - `X-XSS-Protection`: XSS protection header, derived from constant value `X_OPTIONS`.
 *    - `X-Content-Type-Options`: Content type options header, derived from environment variable `VITE_X_CONTENT_OPTIONS`.
 *    - `Referrer-Policy`: Referrer policy header, derived from environment variable `VITE_REF_POLICY`.
 *    - `Strict-Transport-Security`: Strict Transport Security policy header, derived from the constant `TSP_SECURITY`.
 *    - `Accept`: Accept header, derived from environment variable `VITE_CONTENT_TYPE`.
 *    - `withCredentials`: Indicates whether cross-site Access-Control requests should include credentials.
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
        "Accept": String(import.meta.env.VITE_CONTENT_TYPE),
    },
    withCredentials: true,
});

api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response) { 
        // Mitigate Unauthorized access -> redirect to login page
        if (error.response.status === HTTP_RESPONSE_STATUS.UNAUTHORIZED) {
            window.location.href = '/login';
        }
        // API returned an error response
        const message = new Error(error.response.data.message || "API Error");
        
        return Promise.reject({message, response: error.response.data});
    } else if (error.request) {
        // No response was received - Network Issue
        const err = new Error("Network error: Unable establish connection.");
        
        return Promise.reject(err);
    } else if (error.code === 'ECONNABORTED') {
        commonStore.openNotification(
            NOTIFICATION_TYPES.DESTRUCTIVE,
            'Timeeout Error',
            'Request timeout. Please try again.'
        );
    } else {
        // Handle Unexpected Errors
        const err = new Error(error.message || "Unexpected error.");

        return Promise.reject(err);
    }
});

export default api;