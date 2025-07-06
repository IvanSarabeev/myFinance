import { Types } from "mongoose";
import Income from "../model/income.js";

class IncomeRepository {

    /**
     * 
     * @param {String} userId - The ID of the user whose income is to be created. 
     * @param {Object} excludeProperties - Properties to exclude from the result. 
     * @returns {Promise<Object>} - The newly created income entry.
     */
    async findUserIncomeById(userId, excludeProperties = {}) {
        return await Income.find({ userId }).select(excludeProperties).sort({ date: -1 });
    }

    /**
     * 
     * @param {String} userId - The ID of the User 
     * @returns {Promise<Object>} - The total income User have.
     */
    async totalUserIncome(userId) {
        const objectId = new Types.ObjectId(userId);

        return await Income.aggregate([
            { $match: { userId: objectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
    }

    /**
     * 
     * @param {String} userId - The ID of the User
     * @param {Number} days - The number of days the User can filter 
     * @returns {Promise<Object>} - Income data based on the days/filtering 
     */
    async lastIncomeTransactions(userId, days = 30) {
        const last60Days = days * 24 * 60 * 60 * 1000;

        return await Income.find({ 
            userId,
            date: { $gte: new Date(Date.now() - last60Days) },
        }).sort({ date: -1 });
    };

    /**
     * 
     * @param {String} userId - The ID of the User
     * @param {Number} searchLimit - The Limit for searching
     * @returns {Promise<Object>} - Return transactions based on the limit with type 'income'
     */
    async lastTransactions(userId, searchLimit = 5) {
        const results = await Income.find({ userId }).sort({ date: -1 }).limit(searchLimit);
    
        return results.map((item) => ({
            ...item.toObject(),
            type: 'income',
        }));
    }
}

export default new IncomeRepository();