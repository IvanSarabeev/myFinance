export const WALLET_STEPS = {
    Initial: "Initial",
    CUSTOM_ACCOUNT: "CustomAccount",
    CUSTOM_WALLET: "CustomWallet",
    DEFAULT: "Default"
} as const;

/**
 * This is a list of currency codes that can be used in the wallet application.
 */
export const CurrencyOptions = {
    USD: "USD",
    EUR: "EUR",
    GBP: "GBP",
    JPY: "JPY",
    CNY: "CNY",
    INR: "INR",
    RUB: "RUB",
    BTC: "BTC",
    ETH: "ETH",
    LTC: "LTC",
    BGN: "BGN",
    CZK: "CZK",
    TUR: "TUR",
} as const; 

/**
 * This is a list of account types that can be used in the wallet application.
 */
export const AccountTypeOptions = {
    SAVINGS: "Savings",
    CREDIT: "Credit",
    CHECKING: "Checking",
    INVESTING: "Investment",
    DEPOSIT: "Deposit",
    STANDARD: "Standard", // Universall Type
} as const;