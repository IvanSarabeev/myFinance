import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();

const host = String(process.env.HOST_SERVICE);
const hostPort = Number(process.env.HOST_PORT);
const user = String(process.env.EMAIL_ADDRESS);
const pwd = String(process.env.EMAIL_PASSWORD);

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