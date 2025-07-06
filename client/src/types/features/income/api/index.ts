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