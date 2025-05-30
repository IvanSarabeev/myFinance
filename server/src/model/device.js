import { Schema } from "mongoose"
import { DeviceModels } from "../enums/deviceEnum.js";

const deviceSchema = new Schema({
    userAgent: {
        type: String,
        required: true,
    },
    browser: {
        type: String,
        required: true,
    },
    os: {
        type: String,
        required: true,
    },
    cpu: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    deviceType: {
        type: Number,
        enum: Object.values(DeviceModels),
        required: [true, "Device type is required"],
    },
    timeZone: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    lastActive: {
        type: String,
        required: true,
    }
}, { _id: false }); // Avoid Creating subContent

export default deviceSchema;