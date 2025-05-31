import mongoose from "mongoose";

import Account from './../model/account.js';

/**
 * @class AccountRepository
 * @classdesc Repository for interacting with the Account model.
 */
class AccountRepository {
    /**
     * Retrieves a list of wallets associated with a specific user.
     *
     * @param {Object} filters - Filter object
     * @param {number} skip - Number of documents to skip
     * @param {number} limit - Max number of documents to show
     * @return {Promise<Array>} A promise that resolves to an array of wallet objects associated with the userId.
     * @throws {Error} Throws an error if the operation fails or an exception occurs during database access.
     */
    async findWithPagination(filters, skip, limit ) {
        try {
            const excludeFromSelect = {
                _id: 0,
                wallet: 0,
                __v: 0,
            };

            const queryAccounts = await Account.find(filters).skip(skip).limit(limit).select(excludeFromSelect).lean();
            const countAccounts = await Account.countDocuments(filters);

            const [accounts, total] = await Promise.all([queryAccounts, countAccounts]);

            return { accounts, total };
        } catch (error) {
            console.error(`DataBase Exception: ${error}`);

            throw Error(`Failed to find accounts: ${error instanceof Error ? error.message : "An error occurred"}`);
        }
    }

    /**
     * Create a default Account or Customise the currency.
     * 
     * @param {Object} data - Account data (wallet, currency, balance). 
     * @returns {Promise<Account>} - The newly create User account.
     * @throws {Error} - If the transaction fails.
     */
    async create(data) {
        const session = await mongoose.startSession();

        try {
            session.startTransaction();
            
            const account = await Account.create(data);
            session.commitTransaction();

            return account;
        } catch (error) {
            session.abortTransaction();
            
            throw new Error(`Failed to create account: ${error.message ?? "Transaction failure"}`);
        } finally {
            session.endSession();
        }
    };
};

export default new AccountRepository;