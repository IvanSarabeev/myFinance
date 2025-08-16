import api from "@/utils/axios";
import { ExpenseDetails, ExpenseResponse } from "@/types/features/dashboard";
import { IncomeDetails, IncomeResponse } from "@/types/features/dashboard";
import { formatAxiosError } from "@/utils/axiosErrorHandler";

/**
 * Fetches income details including total income, last 30 days and 60 days income, and recent transactions.
 * 
 * @returns {IncomeDetails} Income details including total income, last 30 days and 60 days income, and recent transactions.
 */
export async function incomeTransactionDetails(): Promise<IncomeDetails> {
    try {
        const {status, data} = await api.get<IncomeResponse>("/v1/dashboard/income/transactions", {
            withCredentials: true
        });

        if (!data.status && !status) {
            throw new Error("Failed to fetch income details");
        }

        return data.data;
    } catch (error: unknown) {
        throw formatAxiosError(error);
    }
};

/**
 * Fetches expense details including total expense, last 30 days and 60 days expense, and recent transactions.
 * 
 * @returns {ExpenseDetails} Expense details including total expense, last 30 days and 60 days expense, and recent transactions. 
 */
export async function expenseTransactionDetails(): Promise<ExpenseDetails> {
    try {
        const {status, data} = await api.get<ExpenseResponse>("/v1/dashboard/expense/transactions", {
            withCredentials: true
        });
        
        if (!data.status && !status) {
            throw new Error("Failed to fetch expense details");
        }

        return data.data;
    } catch (error: unknown) {
        throw formatAxiosError(error);
    }
}