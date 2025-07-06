import { HTTP_RESPONSE_STATUS } from "../defines.js";
import IncomeRepository from "../repositories/IncomeRepository.js";
import ExpenseRepository from "../repositories/ExpenseRepository.js";
import { logMessage } from "../utils/helpers.js";
import { transactionTotals } from "../utils/index.js";

const { OK, INTERNAL_SERVER_ERROR } = HTTP_RESPONSE_STATUS;

/**
 * Get User Income transactions
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
export async function getIncomeDataOverview(req, res) {
    const userId = req.user?.id;
    const incomeLimit = req.params?.incomeLimit;

    try {
        const [
            totalIncome,
            last30Days,
            last60Days,
            recentTransactions
        ] = await Promise.all([
            IncomeRepository.totalUserIncome(userId),
            IncomeRepository.lastIncomeTransactions(userId),
            IncomeRepository.lastIncomeTransactions(userId, 60),
            IncomeRepository.lastTransactions(userId, incomeLimit),
        ]);

        res.status(OK).json({
            // Front-end must calculate = Income - Expense / TotalBalance
            totalIncome: totalIncome[0]?.total || 0,
            last30DaysExpenses: {
                total: transactionTotals(last30Days),
                transactions: last30Days,
            },
            last60DaysExpenses: {
                total: transactionTotals(last60Days),
                transactions: last60Days,
            },
            recentTransactions
        });
    } catch (error) {
        logMessage(error, 'Unexpected Server Error when downloading income report');

        res.status(INTERNAL_SERVER_ERROR).json({
            status: false,
            message: `${error.message ?? "Internal Server Error"}`,
        });
    }
}


/**
 * Get the User Expense transactions
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
export async function getExpenseDataOverview(req, res) {
    const userId = req.user?.id;
    const expenseLimit = req.params?.expenseLimit;

    try {
        const [
            totalExpense,
            last30Days,
            last60Days,
            recentTransactions
        ] = await Promise.all([
            ExpenseRepository.totalUserExpense(userId),
            ExpenseRepository.lastExpenseTransactions(userId),
            ExpenseRepository.lastExpenseTransactions(userId, 60),
            ExpenseRepository.lastTransactions(userId, expenseLimit),
        ]);

        res.status(OK).json({
            // Front-end must calculate = Income - Expense / TotalBalance
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysExpenses: {
                total: transactionTotals(last30Days),
                transactions: last30Days,
            },
            last60DaysExpenses: {
                total: transactionTotals(last60Days),
                transactions: last60Days,
            },
            recentTransactions
        });
    } catch (error) {
        logMessage(error, 'Unexpected Server Error when downloading income report');

        res.status(INTERNAL_SERVER_ERROR).json({
            status: false,
            message: `${error.message ?? "Internal Server Error"}`,
        });
    }
}