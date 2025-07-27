import { IncomeSourceTypes } from "@/features/income/configs";

export interface Income {
    readonly _id: string;
    icon: string;
    source: IncomeSourceTypes;
    amount: number;
    date: Date;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface IncomeDetails {
    totalIncome: number;
    last30DaysIncome: {
        total: number;
        transactions: Income[] | [];
    };
    last60DaysIncome: {
        total: number;
        transactions: Income[] | [];
    };
    recentTransactions: Income[] | [];
}

export interface IncomeResponse {
    status: boolean;
    data: {
        totalIncome: number;
        last30DaysIncome: {
            total: number
            transactions: Income[] | [],
        };
        last60DaysIncome: {
            total: number;
            transactions: Income[] | [];
        }
        recentTransactions: Income[] | [];
    }
}