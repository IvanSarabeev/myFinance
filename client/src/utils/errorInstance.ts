import { AxiosError } from 'axios';
import { HTTP_RESPONSE_STATUS } from '@/defines';
import { ApiErrorResponse } from '@/types/utilTypes';

export function toErrorResponse(error: unknown): ApiErrorResponse {
    if (error && typeof error === "object" && "isAxiosError" in error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;

        // Extract error from AxiosError
        if (axiosError?.response?.data) {
            return {
                ...axiosError.response.data,
                status: axiosError.response.data.status ?? false,
                statusCode: axiosError.response.status ?? HTTP_RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
                message: axiosError.response.data.message ?? "Unexpected error occurred",
            };
        }
    }

    // Return base error response if the error is not an AxiosError
    const baseError: ApiErrorResponse = {
        status: (error as ApiErrorResponse).status ?? false,
        statusCode: (error as ApiErrorResponse).statusCode ?? HTTP_RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
        message: (error as ApiErrorResponse).message ?? "Unexpected error occurred",
    };

    return {
        ...baseError,
        ...(typeof error === "object" && error !== null ? error : {}),
    }
}