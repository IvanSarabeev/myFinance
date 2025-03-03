import { HTTP_RESPONSE_STATUS } from "../defines.js";
import { AccountTypeEnum } from "../enums/accountEnum.js";
import { TransactionCategoryEnum } from "../enums/transactionEnum.js";
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
        account: account._id,
        amount: initialDeposit,
        type: AccountTypeEnum.DEPOSIT,
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
        message: "Deposit transaction created successfully",
    };
};