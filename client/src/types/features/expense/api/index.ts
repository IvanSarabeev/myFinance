import { ExpenseCategoryTypes } from "@/features/expense/configs";

export interface Expense {
    readonly _id: string;
    icon: string;
    category: ExpenseCategoryTypes;
    amount: number;
    date: Date;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}