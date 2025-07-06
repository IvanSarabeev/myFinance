import { HTTP_RESPONSE_STATUS } from "../defines.js";
import Income from "../model/income.js";
import { logMessage } from "../utils/helpers.js";
import { isValidObjectId } from "../utils/index.js";

const { BAD_REQUEST, CREATED, OK, INTERNAL_SERVER_ERROR, NOT_FOUND } = HTTP_RESPONSE_STATUS;

/**
 * Create a new income entry
 * 
 * @param {Object} parameters - Parameters for creating income
 * @param {string} parameters.source - Source of income (e.g., Salary, Freelance, etc.)
 * @param {number} parameters.amount - Amount of income
 * @param {Date} parameters.date - Date of income
 * @param {string} parameters.icon - Icon representing the income source
 *  
 * @returns {Object} - Response object containing status, statusCode, and data or error message
 */
export async function createIncome(parameters) {
    const { source, amount, date } = parameters;

    if (!source || !amount || !date) {
        logMessage({ source, amount, date }, 'Invalid parameters for creating income');
        
        return {
            status: false,
            statusCode: BAD_REQUEST,
            message: 'All fields are required',
            errorFields: ['source', 'amount', 'date']
        }
    }

    const newIncome = new Income({
        userId: parameters.userId,
        icon: parameters.icon || 'default-icon.png', // Default icon if not provided
        source,
        amount,
        date: new Date(date)
    });

    await newIncome.save();

    return { status: true, statusCode: CREATED, data: newIncome }
}

/**
 * Fetch all income entries for a User
 * 
 * @param {String} userId - ID of the user whose incomes are to be fetched 
 * @returns {Object} - Response object containing status, statusCode, and data or error message
 */
export async function getAllUserIncomes(userId) {
    const excludeProperties = {
        userId: 0,
        __v: 0,
    };

    try {
        const incomes = await Income.find({ userId })
            .select(excludeProperties)
            .sort({ date: -1 });

        return { status: true, statusCode: OK, data: incomes };
    } catch (error) {
        logMessage(error, 'Error fetching all incomes');

        return {
            status: false,
            statusCode: INTERNAL_SERVER_ERROR,
            message: 'Failed to fetch incomes'
        };
    }
}

/**
 * Deletes an income entry by ID for a User
 * 
 * @param {String} incomeId - ID of the income entry to be deleted
 * @param {String} userId - ID of the User who owns the income entry
 * @returns {Object} - Response object containing status, statusCode, and message or error details
 */
export async function deleteUserIncome(incomeId, userId) {
    if (!incomeId || !userId) {
        logMessage({ incomeId, userId }, 'Invalid parameters for deleting income');

        return {
            status: false,
            statusCode: BAD_REQUEST,
            message: 'Income ID and User ID are required',
        };
    }

    if (!isValidObjectId(incomeId)) {
        return {
            status: false,
            statusCode: BAD_REQUEST,
            message: 'Invalid income ID format',
        };
    }

    const deleteIncome = await Income.findOneAndDelete({ _id: incomeId, userId });

    if (!deleteIncome) {
        logMessage({ incomeId, userId }, 'Income not found for deletion');

        return {
            status: false,
            statusCode: NOT_FOUND,
            message: 'Income not found or not authorized to delete.',
        };
    }

    return {
        status: true,
        statusCode: OK,
        message: 'Income deleted successfully',
    };
}