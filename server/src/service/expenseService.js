import ExcelJS from 'exceljs';
import path from "node:path";
import fs from "node:fs/promises";
import { HTTP_RESPONSE_STATUS } from "../defines.js";
import ExpenseRepository from "../repositories/ExpenseRepository.js";
import { logMessage } from "../utils/helpers.js";
import { isValidObjectId } from "../utils/index.js";
import { format } from 'date-fns-tz';
import Expense from '../model/expense.js';

const { BAD_REQUEST, CREATED, OK, INTERNAL_SERVER_ERROR, NOT_FOUND } = HTTP_RESPONSE_STATUS;

const excludeProperties = {
    userId: 0,
    __v: 0,
};

/**
 * Create a new income entry
 * 
 * @param {Object} parameters - Parameters for creating income
 * @param {string} parameters.category - Category (e.g., Salary, Freelance, etc.)
 * @param {number} parameters.amount - Amount of expense
 * @param {Date} parameters.date - Date of expense
 * @param {string} parameters.icon - Icon representing the expense source
 *  
 * @returns {Object} - Response object containing status, statusCode, and data or error message
 */
export async function createExpense(parameters) {
    const { userId, icon, category, amount, date } = parameters;

    if (!category || !amount || !date) {
        logMessage({ category, amount, date }, 'Invalid parameters for creating expense');
        
        return {
            status: false,
            statusCode: BAD_REQUEST,
            message: 'All fields are required',
            errorFields: ['category', 'amount', 'date']
        }
    }

    const newExpense = new Expense({
        userId,
        icon: icon || 'default-icon.png', // Default icon if not provided
        category: category.toUpperCase(),
        amount,
        date: new Date(date)
    });

    await newExpense.save();

    return { status: true, statusCode: CREATED, data: newExpense };
}

/**
 * Fetch all expense entries for a User
 * 
 * @param {String} userId - ID of the user whose expense are to be fetched 
 * @returns {Object} - Response object containing status, statusCode, and data or error message
 */
export async function getAllUserExpenses(userId) {
    if (!isValidObjectId(userId)) {        
        return {
            status: false,
            statusCode: BAD_REQUEST,
            message: 'Invalid user ID format',
        };
    }

    try {
        const incomes = await ExpenseRepository.findUserExpenseById(userId, excludeProperties);

        return { status: true, statusCode: OK, data: incomes };
    } catch (error) {
        logMessage(error, 'Error fetching all expenses');

        return {
            status: false,
            statusCode: INTERNAL_SERVER_ERROR,
            message: 'Failed to fetch expenses'
        };
    }
}

/**
 * Deletes an expense entry by ID for a User
 * 
 * @param {String} expenseId - ID of the expense entry to be deleted
 * @param {String} userId - ID of the User who owns the expense entry
 * @returns {Object} - Response object containing status, statusCode, and message or error details
 */
export async function deleteUserExpense(expenseId, userId) {
    if (!expenseId || !userId) {
        logMessage({ expenseId, userId }, 'Invalid parameters for deleting expense');

        return {
            status: false,
            statusCode: BAD_REQUEST,
            message: 'Expense ID and User ID are required',
        };
    }

    if (!isValidObjectId(expenseId)) {
        return {
            status: false,
            statusCode: BAD_REQUEST,
            message: 'Invalid expense ID format',
        };
    }

    const deleteExpense = await Expense.findOneAndDelete({ _id: expenseId, userId });

    if (!deleteExpense) {
        logMessage({ expenseId, userId }, 'Expense not found for deletion');

        return {
            status: false,
            statusCode: NOT_FOUND,
            message: 'Expense not found or not authorized to delete.',
        };
    }

    return {
        status: true,
        statusCode: OK,
        message: 'Expense deleted successfully',
    };
}

/**
 * Get expense and map the formated value 
 * 
 * @param {String} userId - ID of the User who owns the expense entry
 * @returns {Object} - Response object containing status, statusCode, and message or error details
 */
export async function getExpenseReport(userId) {
    try {
        const expense = await ExpenseRepository.findUserExpenseById(userId, excludeProperties);
        
        if (Array.isArray(expense) && expense.length > 0) {
            return expense.map((item) => ({
                source: item.source,
                amount: item.amount,
                date:   item.date,
            }));
        }

        return [];
    } catch (error) {
        logMessage(error, 'Error when fetching User expenses');

        return {
            status: false,
            statusCode: INTERNAL_SERVER_ERROR,
            message: 'Failed to fetch expenses'
        };
    }
}

/**
 * Process the Xlsx File Generation
 * 
 * @param {Object[]} parameters - Parameters for creating worksheet
 * @param {String} parameters.category - Category (e.g., Salary, Freelance, etc.)
 * @param {Number} parameters.amount - Amount of expense
 * @param {Date} parameters.date - Date of expense
 * @returns 
*/
export async function downloadUserReport(parameters) {
    const formattedDate = format(new Date(), 'dd.MM.yyyy');
    const fileName = `expense_report_${formattedDate}.xlsx`;
    // eslint-disable-next-line no-undef
    const filePath = path.join(process.cwd(), 'expense_reports', fileName);

    try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Expense');

        worksheet.columns = [
            { header: 'Num', key: 'num', width: 10 },
            { header: 'Category', key: 'category', width: 20 },
            { header: 'Amount', key: 'amount', width: 15 },
            { header: 'Date', key: 'date', width: 20 },
        ];

        worksheet.addRows(parameters.map((row, index) => ({
            ...row,
            num: index + 1,
            date: new Date(row.date) // Convert Date
        })));

        worksheet.getRow(1).font = { bold: true };

        await fs.mkdir(path.dirname(filePath), { recursive: true });

        await workbook.xlsx.writeFile(filePath);

        return { status: true, filePath, fileName };
    } catch (error) {
        logMessage(error, 'Error when generating User Expense Report');

        return {
            status: false,
            statusCode: INTERNAL_SERVER_ERROR,
            message: 'Failed to generate expense report'
        };
    }
}
