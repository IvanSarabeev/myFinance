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
        "Accept": String(import.meta.env.VITE_CONTENT_TYPE),
    },
    withCredentials: true,
});

// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error.response) {
//         // API returned an error response
//         return Promise.reject(error);
//       } else if (error.request) {
//         // No response was received
//         return Promise.reject(
//           new Error("Network error: Unable to connect to the server.")
//         );
//       } else {
//         // Other unexpected error
//         return Promise.reject(new Error(error.message || "Unexpected error."));
//       }
//     }
//   );

export default api;