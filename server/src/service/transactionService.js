import { HTTP_RESPONSE_STATUS } from "../defines.js";
import { TransactionCategoryEnum, TransactionTypeEnum } from "../enums/transactionEnum.js";
import TransactionRepository from "../repositories/TransactionRepository.js";

const {CREATED, INTERNAL_SERVER_ERROR} = HTTP_RESPONSE_STATUS;

/**
 * Create initial Transaction Deposit
 * 
 * @param {Object} account - Account Model -> ObjectId
 * @param {Number} initialDeposit - The initial deposit a User sets 
 * @returns {Object} 
 */
export async function createDepositTransaction(account, initialDeposit) {    
    const depositPayload = {
        account: account,
        amount: initialDeposit,
        type: TransactionTypeEnum.DEPOSIT,
        category: TransactionCategoryEnum.DEPOSIT,
        date: new Date(),
        description: "Initial deposit, during account setup",
    };

    const depositTransaction = await TransactionRepository.create(depositPayload);

    if (!depositTransaction) {
        return {
            status: false,
            statusCode: INTERNAL_SERVER_ERROR,
            message: "Unable to create initial deposit. Please feel free to contact our support center!",
        };
    }

    return {
        status: true,
        statusCode: CREATED,
        message: "Congratulations, you created new wallet with successfull deposit transaction.",
    };
};