import { ExpenseCategoryTypes } from "@/features/expense/configs";

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
    last30DaysExpense: {
        total: number;
        transactions: Expense[];
    };
    last60DaysExpense: {
        total: number;
        transactions: Expense[];
    };
    recentTransactions: Expense[];
}

export interface ExpenseResponse {
    status: boolean;
    data: {
        totalExpense: number;
        last30DaysExpense: {
            total: number;
            transactions: Expense[];
        };
        last60DaysExpense: {
            total: number;
            transactions: Expense[];
        };
        recentTransactions: Expense[];
    }
}