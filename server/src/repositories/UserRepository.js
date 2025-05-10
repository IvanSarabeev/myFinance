import mongoose from 'mongoose';

import User from './../model/user.js';

/**
 * @class UserRepository
 * @classdesc Repository for interacting with the User model
 */
class UserRepository {
    /**
     * Creates a new user in the database.
     *
     * @param {Object} data - User data to create a new user.
     * @returns {Promise<User>} - The newly created user.
     * @throws {Error} - If the transaction fails. 
     */
    async create(data) {
        const session = await mongoose.startSession();
        session.startTransaction();
        
        try {
            const user = await User.create([data], { session });

            await session.commitTransaction();
            session.endSession();

            return user[0];
        } catch (error) {
            await session.abortTransaction();
            session.endSession();

            throw new Error(`Failed to create user: ${error.message ?? "Internal Server Error"}`);
        }
    };

    /**
     * Fetches a user by their unique ID from the database.
     *
     * @param {string} userId - The ID of the user to retrieve.
     * @param {string} [fields=''] - A comma-separated string of fields to return from the result.
     * @return {Promise<Object|null>} A promise that resolves to the user object if found, otherwise null.
     */
    async findById(userId, fields = '') {
        return User.findById(userId)?.select(fields);
    };

    /**
     * Finds a user by their email address.
     *
     * @param {string} email - The email of the user.
     * @returns {Promise<User|null>} - The found user or null if not found.
     */
    async findByEmail(email) {
        return await User.findOne({ email });
    };

    /**
     * Find a user by a specific search criteria.
     * 
     * @param {Object} parameters - The search criteria. 
     * @returns {Promise<User|null>} - The found user or null if not found.
     */
    async findByCriteria(parameters) {
        return await User.findOne(parameters);
    }

    /**
     * Finds a user associated with a specific wallet.
     *
     * @param {string} walletId - The ID of the wallet.
     * @returns {Promise<User|null>} - The user who owns the wallet or null if not found.
     */
    async findByWallet(walletId) {
        return await User.findOne({ wallets: walletId });
    };

    /**
     * Updates a user's data.
     *
     * @param {string} id - The ID of the user to update.
     * @param {Object} data - The updated user data.
     * @returns {Promise<User|null>} - The updated user or null if not found.
     * @throws {Error} - If the transaction fails. 
     */
    async update(id, data) {
        const session = await mongoose.startSession();
        
        try {
            session.startTransaction();

            const user = await User.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true,
                session,
            });
            
            await session.commitTransaction();
            
            return user;
        } catch (error) {
            await session.abortTransaction();
            
            throw new Error(`Failed to update User: ${error.message ?? "Internal Server Error"}`);
        } finally {
            session.endSession();
        }
    }

    /**
     * Deletes a user from the database.
     *
     * @param {string} id - The ID of the user to delete.
     * @returns {Promise<User|null>} - The deleted user or null if not found.
     * @throws {Error} - If the transaction fails. 
    */
    async delete(id) {
        const session = mongoose.startSession();
        await session.startTransaction();
        
        try {
            const user = await User.findByIdAndDelete(id, { session });
            
            (await session).commitTransaction();
            (await session).endSession();

            return user;
        } catch (error) {
            (await session).abortTransaction();
            (await session).endSession

            throw new Error(`Failed to delete user: ${error.message ?? "An error occurred"}`);
        }
    }
}

export default new UserRepository;