import { IncomeSourceTypes } from "@/features/dashboard/config";

export interface Income {
    readonly _id: string;
    icon: string;
    source: IncomeSourceTypes;
    amount: number;
    type: string;
    date: Date;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface IncomeListResponse {
    status: boolean;
    data: Income[];
}

export interface IncomeDetailsResponse {
    status: boolean;
    data: Income;
}

export interface CreateIncomeResponse {
    status: boolean;
    data: Income;
}

export interface DeleteIncomeResponse {
    status: boolean;
}

export interface DownloadIncomeResponse {
    status: boolean;
    data: string;
}