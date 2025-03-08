import { TransactionCategory, TransactionTypes } from "@/configs/transactions";
import { FeatureStatusTypes } from "../defaults";

/**
 * Base Transaction Model
 */
export interface TransactionModel {
    id: string;
    amount: number;
    userId: string;
    status: FeatureStatusTypes;
    type: typeof TransactionTypes;
    category: typeof TransactionCategory;
    date: Date,
    blockedBy: string[],
    createdAt: Date;
    dateModified?: Date;
    description: string;
}
