import { Schema, model } from "mongoose";
import { CurrencyEnum } from './../enums/currencyEnum.js';

const accountSchema = new Schema({
    wallet: {
        type: Schema.Types.ObjectId,
        ref: "Wallet",
        required: [true, "Wallet ID is required"],
    },
    currency: {
        type: String,
        enum: Object.values(CurrencyEnum),
        default: CurrencyEnum.BGN,
        trim: true,
        required: [true, "Currency is required"],
    },
    balance: {
        type: Number,
        default: 0,
    },
}, {timestamps: true});

const Account = model("Account", accountSchema);

export default Account;