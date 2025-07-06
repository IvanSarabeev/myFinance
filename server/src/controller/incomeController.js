// import fs from "node:fs/promises";
import { HTTP_RESPONSE_STATUS } from "../defines.js";
import { createIncome, deleteUserIncome, downloadUserReport, getAllUserIncomes, getIncomeReport } from "../service/incomeService.js";
import { logMessage } from "../utils/helpers.js";
import { isFileExisting } from "../utils/index.js";

const { NOT_FOUND, RESOURCE_GONE, INTERNAL_SERVER_ERROR } = HTTP_RESPONSE_STATUS;

/**
 * Adds a new income entry for the User.
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
export async function addIncome(req, res) {
    const userId = req.user?.id;

    try {
        const { icon, source, amount, date } = req.body;

        const response = await createIncome({ userId, icon, source, amount, date });
        const { status, statusCode, data, message, errorFields } = response;

        res.status(statusCode).json({ status, data, message, errorFields });
    } catch (error) {
        logMessage(error, 'Unexpected Server Error when adding income');
        
        res.status(INTERNAL_SERVER_ERROR).json({
            status: false,
            message: `${error.message ?? "Internal Server Error"}`,
        });
    }
}

/**
 * Fetches all income entries for the User.
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
export async function getAllIncomes(req, res) {
    const userId = req.user?.id;

    try {
        const response = await getAllUserIncomes(userId);
        const { status, statusCode, data, message } = response;

        res.status(statusCode).json({ status, data, message });
    } catch (error) {
        logMessage(error, 'Unexpected Server Error when fetching all incomes');

        res.status(INTERNAL_SERVER_ERROR).json({
            status: false,
            message: `${error.message ?? "Internal Server Error"}`,
        });
    }
}

/**
 * Deletes an income entry by ID for the User.
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
export async function deleteIncome(req, res) {
    const userId = req.user?.id;
    const id = req.params?.id;

    try {
        const response = await deleteUserIncome(id, userId);
        const { status, statusCode, message } = response;

        res.status(statusCode).json({ status, message });
    } catch (error) {
        logMessage(error, 'Unexpected Server Error when deleting income');

        res.status(INTERNAL_SERVER_ERROR).json({
            status: false,
            message: `${error.message ?? "Internal Server Error"}`,
        });
    }
}

/**
 * Downloads the income report for the User.
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
export async function downloadIncomeReport(req, res) {
    const userId = req.user?.id;

    try {
        const parameters = await getIncomeReport(userId);

        if (!Array.isArray(parameters) && parameters.length === 0) {
            return res.status(NOT_FOUND).json({
                status: false,
                message: 'No income data available',
            });
        }

        const { status, filePath, fileName, message } = await downloadUserReport(parameters);

        if (!status || !filePath) {
            return res.status(INTERNAL_SERVER_ERROR).json({ status, message });
        }

        const fileExists = await isFileExisting(filePath);
        if (!fileExists) {
            return res.status(RESOURCE_GONE).json({ status, message: 'Report file no longer exists' });
        }
        
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        
        return res.download(filePath, fileName, async (error) => {
            if (error) {
                logMessage({ error, fileName }, 'Error when sending income report file');

                return res.status(INTERNAL_SERVER_ERROR).json({ status, message: 'Failed to send invoice report' });
            }

            // try {
            //     // Delete the File after it's being downloaded
            //     await fs.unlink(filePath);
            // } catch (unlinkError) {
            //     logMessage(unlinkError, `Failed to delete temporary report file ${filePath}`);
            // }
        });
    } catch (error) {
        logMessage(error, 'Unexpected Server Error when downloading income report');

        res.status(INTERNAL_SERVER_ERROR).json({
            status: false,
            message: `${error.message ?? "Internal Server Error"}`,
        });
    }
}