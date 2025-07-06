import { Schema, model } from "mongoose";
import { ExpenseEnum } from "../enums/expenseEnum.js";

const expenseSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
    },
    icon: {
        type: String
    },
    category: {
        type: String,
        enum: Object.values(ExpenseEnum),
        trim: true,
        required: [true, 'Category is required'],
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
    },
    date: {
        type: Date,
        default: Date.now(),
    }
}, { timestamp: true });

const Expense = model('Expense', expenseSchema);

export default Expense;