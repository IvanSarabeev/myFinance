import {Schema, model} from "mongoose";
import deviceSchema from "./device.js";
import { UserRoles } from "../enums/userEnum.js";
import { DEFAULT_USER_AVATAR } from "../config/env.js";
import { COMMON_REGEXS } from './../utils/regex.js';

const {EMAIL} = COMMON_REGEXS;

const userSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "User Name is required"],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "User Email is required"],
        trim: true,
        lowercase: true,
        match: [EMAIL, "Please fill a valid email address"],
    },
    password: {
        type: String,
        required: [true, "User Password is required"],
        minLength: 6,
    },
    terms: {
        type: Boolean,
        default: false,
    },
    userAvatar: {
        type: String,
        default: DEFAULT_USER_AVATAR,
    },
    role: {
        type: String,
        enum: Object.values(UserRoles),
        default: UserRoles.STANDARD_ROLE
    },
    device: deviceSchema,
    verified: {
        type: Boolean,
        default: false,
    },
    blockedBy: {
        type: String,
    },
    otpCode: {
        type: Number,
        length: 6,
        default: null,
    },
    otpExpiration: {
        type: Date,
        default: null,
    },
    transactionId: {
        type: Schema.Types.ObjectId,
        ref: "Transaction",
        index: true,
        unique: true,
    },
    todoId: {
        type: Schema.Types.ObjectId,
        ref: "Todo",
        index: true,
        unique: true,
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        index: true,
        unique: true,
    },
    wallets: {
        type: [Schema.Types.ObjectId],
        ref: "Wallet",
        index: true,
        unique: true,
    }
}, {timestamps: true});

const User = model("User", userSchema);

export default User;