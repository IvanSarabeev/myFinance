export interface ApiErrorResponse {
    status?: boolean;
    statusCode?: number;
    message?: string;
    response?: {
        [key: string]: unknown;
    };
    errorFields?: string[];
};