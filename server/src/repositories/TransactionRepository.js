import mongoose from "mongoose";

import Transaction from "../model/transaction.js";

/**
 * @class TransactionRepository
 * @classdesc Repository for interacting with the Transaction model.
 */
class TransactionRepository {
    
    /**
     * Create User transaction
     * 
     * @param {Object} data - Initial transaction data
     * @returns {Promise<Transaction>} - The newly Deposit Transaction
     * @throws {Error} - If the transaction DB procees fails.
     */
    async create(data) {
        const session = await mongoose.startSession();

        try {
            session.startTransaction();

            const transaction = await Transaction.create(data);
            session.commitTransaction();

            return transaction;
        } catch (error) {
            session.abortTransaction();

            throw new Error(`Failed to create Transaction type: deposit. ${error.message ?? "Transaction failure"}`);
        } finally {
            session.endSession();
        }
    }
};

export default new TransactionRepository;