/**
 * Enum for Transaction Type
 */
export const TransactionTypeEnum = Object.freeze({
    DEPOSIT: "DEPOSIT",
    WITHDRAW: "WITHDRAW",
    TRANSFER: "TRANSFER",
    EXCHANGE: "EXCHANGE",
    PAYMENT: "PAYMENT",
    INCOME: "INCOME",
    EXPENSE: "EXPENSE",
    REVENUE: "REVENUE",
    COST: "COST",
    REFUND: "REFUND",
    SALARY: "SALARY", 
});

/**
 * Enum for Transaction Category
 */
export const TransactionCategoryEnum = Object.freeze({
    // Income Categories
    SALARY: "SALARY",
    BONUS: "BONUS",
    REFUND: "REFUND",
    INVESTMENT: "INVESTMENT",
    INCOME: "INCOME",
    FREELANCE: "FREELANCE",
    OTHER: "OTHER_INCOME",

    // Expense Categories
    FOOD: "FOOD",
    TRANSPORT: "TRANSPORT",
    UTILITIES: "UTILITIES",
    ENTERTAINMENT: "ENTERTAINMENT",
    SHOPPING: "SHOPPING",
    HEALTH: "HEALTH",
    EDUCATION: "EDUCATION",
    TRAVEL: "TRAVEL",
    INSURANCE: "INSURANCE",
    TAX: "TAX",
    LOAN: "LOAN",
    DEBT: "DEBT",
    GIFT: "GIFT",
    HOUSING: "HOUSING",
    GROCERIES: "GROCERIES",
    DINING_OUT: "DINING_OUT",
    HEALTHCARE: "HEALTHCARE",
    SUBSCRIPTIONS: "SUBSCRIPTIONS",
    DEBT_PAYMENTS: "DEBT_PAYMENTS",
    CHARITY: "CHARITY",
    OTHER_EXPENSES: "OTHER_EXPENSES",

    // Transfer & Exhange Categories
    BANK_TRANSFER: "BANK_TRANSFER",
    CRYPTO_TRANSFER: "CRYPTO_TRANSFER",
    CURRENCY_EXCHANGE: "CURRENCY_EXCHANGE",

    // Other Categories
    DONATION: "DONATION",
    INTEREST: "INTEREST",
    DIVIDEND: "DIVIDEND",
    DEPOSIT: "DEPOSIT",
});