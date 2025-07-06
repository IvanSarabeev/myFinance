import { Types } from 'mongoose';
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

    
        /**
         * 
         * @param {String} userId - The ID of the User 
         * @returns {Promise<Object>} - The total expense User have.
         */
        async totalUserExpense(userId) {
            const objectId = new Types.ObjectId(userId);

            return await Expense.aggregate([
                { $match: { userId: objectId } },
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ]);    
        }
    
        /**
         * 
         * @param {String} userId - The ID of the User
         * @param {Number} days - The number of days the User can filter 
         * @returns {Promise<Object>} - Expense data based on the days/filtering 
         */
        async lastExpenseTransactions(userId, days = 30) {
            const last60Days = days * 24 * 60 * 60 * 1000;
    
            return await Expense.find({ 
                userId,
                date: { $gte: new Date(Date.now() - last60Days) },
            }).sort({ date: -1 });
        };
    
        /**
         * 
         * @param {String} userId - The ID of the User
         * @param {Number} searchLimit - The Limit for searching
         * @returns {Promise<Object>} - Return transactions based on the limit with type 'expense'
         */
        async lastTransactions(userId, searchLimit = 5) {
            const results = await Expense.find({ userId }).sort({ date: -1 }).limit(searchLimit);
        
            return results.map((item) => ({
                ...item.toObject(),
                type: 'expense',
            }));
        }
}

export default new ExpenseRepository();