import { HTTP_RESPONSE_STATUS } from "../defines.js";
import { createIncome, deleteUserIncome, getAllUserIncomes } from "../service/incomeService.js";
import { logMessage } from "../utils/helpers.js";

const { INTERNAL_SERVER_ERROR } = HTTP_RESPONSE_STATUS;

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
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
export async function downloadIncomeReport(req, res) {

}