import mongoose from "mongoose";

import Account from './../model/account.js';

/**
 * @class AccountRepository
 * @classdesc Repository for interacting with the Account model.
 */
class AccountRepository {

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
            
            throw new Error(`Failed to create account: ${error.message ?? "Transaction failure"}`)
        } finally {
            session.endSession();
        }
    };
};

export default new AccountRepository;