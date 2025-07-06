import mongoose from "mongoose";
import { IncomeEnum } from './../enums/incomeEnum.js';

const incomeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'User ID is required'],
    },
    icon: {
        type: String,
    },
    source: { // E.g., Salary, Freelance, etc.
        type: String,
        enum: Object.values(IncomeEnum),
        required: [true, 'Source is required'],
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
    },
    date: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

const Income = mongoose.model("Income", incomeSchema);

export default Income;