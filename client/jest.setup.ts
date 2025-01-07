import '@testing-library/jest-dom';

Object.defineProperty(global, "import.meta", {
    value: {
        env: {
            VITE_CLIENT_NODE_ENV: "development",
            VITE_BACKEND_URL: "http://localhost:5000",
            VITE_RESERVER_BACKEND_URL: "http://localhost:4000",
            VITE_STRICT_TSP: "max-age",
            VITE_STRICT_TSP_AGE: "31536000",
            VITE_STRICT_TSP_DOM: "includeSubDomains",
            VITE_X_PROTECTION_ONE: "1",
            VITE_X_PROTECTION_TWO: "mode",
            VITE_X_PROTECTION_THREE: "block",
            VITE_CONTENT_TYPE: "application/json",
            VITE_REF_POLICY: "no-referrer",
            VITE_X_CONTENT_OPTIONS: "nosniff",
        },
    },
});