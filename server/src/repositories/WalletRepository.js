import mongoose from 'mongoose';

import Wallet from './../model/wallet.js';

/**
 * 
 */
class WalletRepository {

    /**
     * Creates a new user wallet in the database.
     *
     * @param {Object} data - Wallet data to create a new Wallet to the User.
     * @returns {Promise<Wallet>} - The newly created wallet.
     * @throws {Error} - If the transaction fails. 
     */
    async create(data) {
        const session = mongoose.startSession();
        (await session).startTransaction();

        try {
            const wallet = await Wallet.create(data);
            
            (await session).commitTransaction();
            (await session).endSession();

            return wallet;
        } catch (error) {
            (await session).abortTransaction();
            (await session).endSession();
            
            throw new Error(`Failed to create wallet: ${error.message ?? "Unable to proceed creating wallet"}`);
        }
    }

    /**
     * Find a user's wallet by their unique ID.
     * 
     * @param {string} id - The ID of the wallet.
     * @returns {Promise<Wallet|null} - The found wallet of user
     */
    async findById(id) {
        return await Wallet.findById(id);
    }

    /**
     * Updates a user's -> wallet data.
     *
     * @param {string} id - The ID of the wallter to update.
     * @param {Object} data - The updated wallet data.
     * @returns {Promise<User|null>} - The updated wallet or null if not found.
     * @throws {Error} - If the transaction fails. 
     */
    async update(id, data) {
        const session = mongoose.startSession();
        (await session).startTransaction();

        try {
            const wallet = await Wallet.findByIdAndUpdate(id, data, { 
                new: true,
                runValidators: true,
                session
            });
            
            (await session).commitTransaction();
            (await session).endSession();

            return wallet;
        } catch (error) {
            (await session).abortTransaction();
            (await session).endSession();
            
            throw new Error(`Failed to update wallet: ${error.message ?? "Unable to proceed"}`);
        }
    }

    /**
     * Delete a wallet from the Wallet.
     *
     * @param {string} id - The ID of the wallet to delete.
     * @returns {Promise<Wallet|null>} - The deleted wallet or null if not found.
     * @throws {Error} - If the transaction fails. 
    */
    async delete(id) {
        const session = mongoose.startSession();
        await session.startTransaction();
        
        try {
            const wallet = await Wallet.findByIdAndDelete(id, { session });
            
            (await session).commitTransaction();
            (await session).endSession();

            return wallet;
        } catch (error) {
            (await session).abortTransaction();
            (await session).endSession

            throw new Error(`Failed to delete wallet: ${error.message ?? "An error occurred"}`);
        }
    }
};

export default new WalletRepository;