import nodemailer from "nodemailer";

import { EMAIL_ADDRESS, EMAIL_PASSWORD, HOST_PORT, HOST_SERVICE } from "./env.js";

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
    }
});

emailTransportProvider.verify((error, success) => {
    if (error) {
        console.error(`Transport verification failed: ${error}`);
    } else {
        console.info(`Transport ready: ${success}`);
    }
})