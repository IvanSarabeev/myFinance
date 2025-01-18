import mongoose from "mongoose";
import dotenv from 'dotenv';
import deviceSchema from "./device.js";
import { UserRoles } from "../enums/userEnum.js";

dotenv.config();

const DEFAULT_AVATAR = process.env.DEFAULT_USER_AVATAR ?? "";

if (!DEFAULT_AVATAR) {
    console.error("Missing Default Avatar Photo");
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    terms: {
        type: Boolean,
        default: false,
    },
    userAvatar: {
        type: String,
        default: DEFAULT_AVATAR,
    },
    role: {
        type: String,
        enum: [
            UserRoles.ADMIN_ROLE,
            UserRoles.MODERATOR_ROLE,
            UserRoles.STANDARD_ROLE
        ],
        default: UserRoles.STANDARD_ROLE
    },
    device: deviceSchema,
    verified: {
        type: Boolean,
        default: false,
    },
    otpCode: {
        type: Number,
        length: 6,
    },
    otpExpiration: {
        type: Date,
    },
    transactionId: {
        type: String,
        unique: true,
    },
    todoId: {
        type: String,
        unique: true,
    },
    commentId: {
        type: String,
        unique: true,
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;