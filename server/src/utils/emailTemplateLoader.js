import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { HTTP_RESPONSE_STATUS } from '../defines.js';
import { TEMPLATE_PRE_FIX } from '../templates/defines.js';
import { CORP_EMAIL_ADDRESS } from '../config/env.js';
import { logMessage } from "./helpers.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { BAD_REQUEST, UNAUTHORIZED, INTERNAL_SERVER_ERROR } = HTTP_RESPONSE_STATUS;

/**
 * Load an email template and replace placeholders with values
 * 
 * @param {string} templateName - name of the template file
 * @param {object} replacements - containing placeholder keys and their values
 */
async function loadEmailTemplate(templateName, replacements = {}) {
    const templatePath = path.join(__dirname, '..', TEMPLATE_PRE_FIX, `${templateName}.html`);

    if (!templatePath) return Error("Service under maintenance! Please contact our support center!");

    try {
        let html = await fs.readFileSync(templatePath, "utf8");

        Object.keys(replacements).forEach((key) => {
            const placeholder = new RegExp(`{{${key}}}`, "g");
            html = html.replace(placeholder, replacements[key]);
        });
    
        return html;
    } catch (error) {
        logMessage(error, 'Error loading email template');

        throw new Error("Server under maintenance! Please contact our support center!");
    }
}

/**
 * Generate/Load email template with dynamic parameters
 * 
 * @param {string} templateName - name of the template file
 * @param {string} templateSubject - subject of the template
 * @param {object} parameters - contains specific parameters that will be passed through the mail template
 */
export async function createEmailTemplate(templateName, templateSubject, parameters) {
    try {
        const corpEmailAddress = CORP_EMAIL_ADDRESS;

        if (!corpEmailAddress) {
            logMessage(corpEmailAddress, 'Missing Corp. Email Address', 'debug');

            return { status: false, statusCode: UNAUTHORIZED, message: "Internal Server Error" };
        }

        // eslint-disable-next-line no-prototype-builtins
        if (parameters instanceof Object && parameters.hasOwnProperty("email") === false) {
            logMessage(parameters, 'Missing email parameter', 'debug');

            return {
                status: false,
                statusCode: BAD_REQUEST,
                message: "Bad Request, please try again later!"
            };
        }

        const htmlContent = await loadEmailTemplate(templateName, parameters);

        return {
            from: `"myFinance EOOD" ${corpEmailAddress}`,
            to: parameters.email,
            subject: templateSubject,
            html: htmlContent,
        };
    } catch (error) {
        logMessage(error, 'Error creating email template');

        return { 
            status: false, 
            statusCode: INTERNAL_SERVER_ERROR,
            message:"Internal Server Error"
        };
    }
};