import { ExpenseCategoryTypes } from "@/features/dashboard/config";
import { IncomeSourceTypes } from "@/features/dashboard/config";

export interface Expense {
    readonly _id: string;
    icon: string;
    category: ExpenseCategoryTypes;
    amount: number;
    date: Date;
    type: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface ExpenseDetails {
    totalExpense: number;
    last30DaysExpenses: {
        total: number;
        transactions: Expense[];
    };
    last60DaysExpenses: {
        total: number;
        transactions: Expense[];
    };
    recentTransactions: Expense[];
}

export interface ExpenseResponse {
    status: boolean;
    data: {
        totalExpense: number;
        last30DaysExpenses: {
            total: number;
            transactions: Expense[];
        };
        last60DaysExpenses: {
            total: number;
            transactions: Expense[];
        };
        recentTransactions: Expense[];
    }
}

export interface Income {
    readonly _id: string;
    icon: string;
    source: IncomeSourceTypes;
    amount: number;
    date: Date;
    type: string;
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