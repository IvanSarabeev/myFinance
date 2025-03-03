import { Schema, model } from "mongoose";

import { AccountTypeEnum, CurrencyEnum } from '../enums/accountEnum.js';

const accountSchema = new Schema({
    wallet: {
        type: Schema.Types.ObjectId,
        ref: "Wallet",
        required: [true, "Wallet ID is required"],
    },
    name: {
        type: String,
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [50, "Name must not exceed 50 characters."],
        default: "Default Account",
        required: [true, "Name is required."]
    },
    currency: {
        type: String,
        enum: Object.values(CurrencyEnum),
        default: CurrencyEnum.BGN,
        trim: true,
        required: [true, "Currency is required."],
    },
    balance: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        trim: true,
        minLength: [3, "Descripton must be at least 3 characters."],
        maxLength: [50, "Description must not exceed 50 characters."],
    },
    icon: {
        type: String,
        trim: true,
    },
    type: {
        type: String,
        enum: Object.values(AccountTypeEnum),
        trim: true,
        required: [true, "Type is required."],
    },
    active: {
        type: Boolean,
        default: true,
    }
}, {timestamps: true});

const Account = model("Account", accountSchema);

export default Account;