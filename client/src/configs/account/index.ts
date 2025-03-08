/**
 * List of available Account-Types
 */
export const AccountTypes = {
    SAVINGS: "Savings",
    CREDIT: "Credit",
    CHECKING: "Checking",
    INVESTING: "Investment",
    DEPOSIT: "Deposit",
    STANDARD: "Standard", // Universall Type
} as const;

/**
 * Currencies that will be used across the application
 */
export const AccountCurrencyTypes = {
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
