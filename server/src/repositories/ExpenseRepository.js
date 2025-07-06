import Expense from './../model/expense.js';

class ExpenseRepository {

    /**
     * 
     * @param {String} userId - The ID of the user whose income is to be created. 
     * @param {Object} excludeProperties - Properties to exclude from the result. 
     * @returns {Promise<Object>} - The newly created income entry.
     */
    async findUserExpenseById(userId, excludeProperties = {}) {
        return await Expense.find({ userId }).select(excludeProperties).sort({ date: -1 });
    }
}

export default new ExpenseRepository();