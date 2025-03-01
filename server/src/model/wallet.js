import { model, Schema } from "mongoose";

const walletSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
    },
    name: {
        type: String,
        trim: true,
        unique: [true, "Wallet Name must be unique"],
        required: [true, "Wallet Name is required"],
        minLength: [3, "Wallet Name must be at least 3 characters"],
        maxLength: [50, "Wallet Name must not exceed 50 characters"],
    },
    accounts: {
        type: Schema.Types.ObjectId,
        ref: "Account",
        required: [true, "Account ID is required"],
    },
}, {timestamps: true});

const Wallet = model("Wallet", walletSchema);

export default Wallet;