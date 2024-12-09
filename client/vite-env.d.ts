/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_CLIENT_NODE_ENV: string,
    readonly VITE_CLOUDINARY_NAME: string,
    readonly VITE_BACKEND_URL: string,
    readonly VITE_RESERVER_BACKEND_URL: string,
    readonly VITE_CONTENT_TYPE: string,
    readonly VITE_REF_POLICY: string,
    readonly VITE_X_OPTIONS: string,
    readonly VITE_X_PROTECTION_ONE: string,
    readonly VITE_X_PROTECTION_TWO: string,
    readonly VITE_X_PROTECTION_THREE: string,
    readonly VITE_X_CONTENT_OPTIONS: string,
    readonly VITE_STRICT_TSP: string,
    readonly VITE_STRICT_TSP_AGE: string,
    readonly VITE_STRICT_TSP_DOM: string,
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}