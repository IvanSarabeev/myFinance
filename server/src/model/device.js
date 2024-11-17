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
        enum: [
            DeviceModels.MOBILE_DEVICE,
            DeviceModels.DEKSTOP_DEVICE,
            DeviceModels.TABLET_DEVICE
        ],
        required: true,
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