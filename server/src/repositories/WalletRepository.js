import mongoose from 'mongoose';
import Wallet from './../model/wallet.js';

/**
 *
 */
class WalletRepository {

    /**
     * Retrieves all wallet information associated with a specific user ID.
     *
     * @param {string} walletId - The unique identifier of the wallet to find.
     * @returns {Promise<Wallet[] | null>}
     */
    async findAllByUserId(walletId) {
        try {
            return await Wallet.findById(walletId).lean();
        } catch (error) {
            console.error(`DataBase Exception: ${error}`);

            throw Error(`Failed to find all wallets: ${error instanceof Error ? error.message : "An error occurred"}`);
        }
    }

    /**
     * Creates a new user wallet in the database.
     *
     * @param {Object} data - Wallet data to create a new Wallet to the User.
     * @returns {Promise<Wallet>} - The newly created wallet.
     * @throws {Error} - If the transaction fails.
     */
    async create(data) {
        const session = await mongoose.startSession();

        try {
            session.startTransaction();

            const wallet = await Wallet.create(data);

            session.commitTransaction();

            return wallet;
        } catch (error) {
            session.abortTransaction();

            throw new Error(`Failed to create wallet: ${error.message ?? "Unable to proceed creating wallet"}`);
        } finally {
            session.endSession();
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
        const session = await mongoose.startSession();

        try {
            session.startTransaction();

            const wallet = await Wallet.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true,
                session
            });

            session.commitTransaction();

            return wallet;
        } catch (error) {
            session.abortTransaction();

            throw new Error(`Failed to update wallet: ${error.message ?? "Unable to proceed"}`);
        } finally {
            session.endSession();
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
        const session = await mongoose.startSession();

        try {
            session.startTransaction();

            const wallet = await Wallet.findByIdAndDelete(id, {session});

            session.commitTransaction();

            return wallet;
        } catch (error) {
            session.abortTransaction();

            throw new Error(`Failed to delete wallet: ${error.message ?? "An error occurred"}`);
        } finally {
            session.endSession();
        }
    }
};

export default new WalletRepository;