import { AxiosError } from 'axios';
import { HTTP_RESPONSE_STATUS } from '@/defines';
import { ApiErrorResponse } from '@/types/defaultApi';

/**
 * Converts an error object to a standardized ApiErrorResponse format.
 * 
 * @param {unknown} error - The error object to be converted to an ApiErrorResponse.
 * @returns {Object} An ApiErrorResponse object containing the error details.
 */
export function formatAxiosError(error: unknown): ApiErrorResponse {
    const {INTERNAL_SERVER_ERROR} = HTTP_RESPONSE_STATUS;

    if (error && typeof error === "object" && "isAxiosError" in error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;

        // Extract error from AxiosError
        if (axiosError?.response?.data) {
            return {
                ...axiosError.response.data,
                status: axiosError.response.data.status ?? false,
                statusCode: axiosError.response.status ?? INTERNAL_SERVER_ERROR,
                message: axiosError.response.data.message ?? "Unexpected error occurred",
            };
        }
    }

    // Return base error response if the error is not an AxiosError
    const baseError: ApiErrorResponse = {
        status: (error as ApiErrorResponse).status ?? false,
        statusCode: (error as ApiErrorResponse).statusCode ?? INTERNAL_SERVER_ERROR,
        message: (error as ApiErrorResponse).message ?? "Unexpected error occurred",
    };

    return {
        ...baseError,
        ...(typeof error === "object" && error !== null ? error : {}),
    }
}