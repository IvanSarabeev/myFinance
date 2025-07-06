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
}

export default new IncomeRepository();