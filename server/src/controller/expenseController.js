// import fs from "node:fs/promises";
import { HTTP_RESPONSE_STATUS } from "../defines.js";
import { createExpense, getAllUserExpenses, deleteUserExpense, getExpenseReport, downloadUserReport } from "../service/expenseService.js";
import { logMessage } from "../utils/helpers.js";
import { isFileExisting } from "../utils/index.js";

const { NOT_FOUND, RESOURCE_GONE, INTERNAL_SERVER_ERROR } = HTTP_RESPONSE_STATUS;

/**
 * Adds a new income entry for the User.
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
export async function addExpense(req, res) {
    const userId = req.user?.id;

    try {
        const { icon, category, amount, date } = req.body;

        const { status, statusCode, data, message, errorFields } = await createExpense({ userId, icon, category, amount, date });

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
 * Fetches all expense entries for the User.
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
export async function getAllExpenses(req, res) {
    const userId = req.user?.id;

    try {
        const { status, statusCode, data, message } = await getAllUserExpenses(userId);

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
 * Deletes an expense entry by ID for the User.
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
export async function deleteExpense(req, res) {
    const userId = req.user?.id;
    const id = req.params?.id;

    try {
        const response = await deleteUserExpense(id, userId);
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
 * Downloads the expense report for the User.
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
export async function downloadExpenseReport(req, res) {
    const userId = req.user?.id;

    try {
        const parameters = await getExpenseReport(userId);

        if (!Array.isArray(parameters) && parameters.length === 0) {
            return res.status(NOT_FOUND).json({
                status: false,
                message: 'No expense data available',
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