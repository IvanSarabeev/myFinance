export const IncomeSourceOptions = {
  SALARY: 'SALARY',
  FREELANCE: 'FREELANCE',
  BUSINESS: 'BUSINESS',
  INVESTMENTS: 'INVESTMENTS',
  RENTAL_INCOME: 'RENTAL_INCOME',
  INTEREST: 'INTEREST',
  DIVIDENDS: 'DIVIDENDS',
  GIFTS: 'GIFTS',
  REFUNDS: 'REFUNDS',
  BONUS: 'BONUS',
  GRANTS: 'GRANTS',
  PENSION: 'PENSION',
  CRYPTO: 'CRYPTO',
  OTHER: 'OTHER',
} as const;

export type IncomeSourceTypes = keyof typeof IncomeSourceOptions;