import api from "@/utils/axios";
import { formatAxiosError } from "@/utils/axiosErrorHandler";
import { CreateIncomeResponse, DownloadIncomeResponse, Income, IncomeListResponse } from "@/types/features/income/api";

/**
 * Get list of all User incomes
 * 
 * @returns {Promise<IncomeListResponse[]>} A promise that resolves to an array of income objects.
 */
export async function getIncomeList(): Promise<Income[]> {
    try {
        const {status, data} = await api.get<IncomeListResponse>("/v1/income/list", {
            withCredentials: true});
            
        if (!status) {
            throw new Error("Failed to fetch income list");
        }

        return data.data;
    } catch (error: unknown) {
        throw formatAxiosError(error);
    }
}

// export async function fetchIncomeDetails(id: string) {
//     try {
//         const { status, data } = await api.get("/v1/income")
//     } catch (error: unknown) {
//         throw formatAxiosError(error);
//     }
// }

/**
 * Create income for User
 * 
 * @param {Income[]} dataDetails - Income data details 
 * @returns {Promise<CreateIncomeResponse>} - created income data details
 */
export async function createIncome(dataDetails: Partial<Income>): Promise<CreateIncomeResponse> {
    try {
        const {status, data} = await api.post<CreateIncomeResponse>("/v1/income/create", dataDetails, {
            withCredentials: true
        });

        if (!status) {
            throw new Error("Failed to add Income. Please contact our support or try again later!");
        }

        return data;
    } catch (error: unknown) {
        throw formatAxiosError(error);
    }
}

// /**
//  * Delete Income based on specified ID
//  * 
//  * @param {string} id - specific Income ID 
//  * @returns {Promise<DeleteIncomeResponse>} - 
//  */
// export async function deleteIncome(id: string): Promise<DeleteIncomeResponse> {
//     try {
//         return await api.delete<DeleteIncomeResponse>(`/v1/income/${id}`, {
//             withCredentials: true
//         });
//     } catch (error: unknown) {
//         throw formatAxiosError(error);
//     }
// }

export async function downloadIncomeDetails() {
    try {
        return await api.post<DownloadIncomeResponse>("/v1/income/download-report", {}, {
            withCredentials: true
        });
    } catch (error: unknown) {
        throw formatAxiosError(error);
    }
}