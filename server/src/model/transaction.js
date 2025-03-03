import { model, Schema } from "mongoose";
import { TransactionCategoryEnum, TransactionTypeEnum } from "../enums/transactionEnum.js";

const transactionSchema = new Schema({
    account: {
        type: Schema.Types.ObjectId,
        ref: "Account",
        required: [true, "Account ID is required"],
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"],
        min: [0, "Amount must be a positive number"],
    },
    type: {
        type: String,
        enum: Object.values(TransactionTypeEnum),
        trim: true,
        required: [true, "Transaction Type is required"],
    },
    category: {
        type: String,
        enum: Object.values(TransactionCategoryEnum),
        trim: true,
        required: [true, "Category is required"],
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    dateModified: {
        type: Date,
        default: Date.now(),
    },
    description: {
        type: String,
        trim: true,
        minLength: [3, "Description must be at least 3 characters"],
        maxLength: [150, "Description must not exceed 150 characters"],
    }
}, {timestamps: true});

const Transaction = model("Transaction", transactionSchema);

export default Transaction;