import nodemailer from "nodemailer";
import { EMAIL_ADDRESS, EMAIL_PASSWORD, HOST_PORT, HOST_SERVICE } from "./env.js";
import {logMessage} from "../utils/helpers.js";
import {LOG_MESSAGE_TYPES} from "../defines.js";

const host = String(HOST_SERVICE);
const hostPort = Number(HOST_PORT);
const user = String(EMAIL_ADDRESS);
const pwd = String(EMAIL_PASSWORD);

/**
 * Nodemailer Email Provider Service
 */
export const emailTransportProvider = nodemailer.createTransport({
    host: host,
    port: hostPort,
    auth: {
        user: user,
        pass: pwd
    },
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    rateLimit: 10,
    rateDelta: 1000,
});

emailTransportProvider.verify((error, success) => {
    if (error) {
        logMessage(error, `Unable to verify SMTP transport: ${error.message}`);
    } else {
        logMessage(success, `SMTP Transport ready`, LOG_MESSAGE_TYPES.Info);
    }
})