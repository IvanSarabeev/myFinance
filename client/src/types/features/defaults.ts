import { ExpenseCategoryTypes } from "@/features/expense/configs";
import { IncomeSourceTypes } from "@/features/income/configs";
import { Income } from "./income/api";
import { Expense } from "./expense/api";

export type FeatureStatusTypes = "completed" | "active" | "expired" | "declined";

export const IncomeSourceLabels: Record<IncomeSourceTypes, string> = {
  SALARY: "Salary",
  FREELANCE: "Freelance",
  BUSINESS: "Business",
  INVESTMENTS: "Investments",
  RENTAL_INCOME: "Rental Income",
  INTEREST: "Interest",
  DIVIDENDS: "Dividends",
  GIFTS: "Gifts",
  REFUNDS: "Refunds",
  BONUS: "Bonus",
  GRANTS: "Grants",
  PENSION: "Pension",
  CRYPTO: "Crypto",
  OTHER: "Other",
} as const;

export const ExpenseCategoryLabels: Record<ExpenseCategoryTypes, string> = {
  RENT: "Rent",
  GROCERIES: "Groceries",
  UTILITIES: "Utilities",
  TRANSPORTATION: "Transportation",
  INSURANCE: "Insurance",
  HEALTHCARE: "Healthcare",
  DEBT: "Debt",
  ENTERTAINMENT: "Entertainment",
  DINING_OUT: "Dining Out",
  EDUCATION: "Education",
  PERSONAL_CARE: "Personal Care",
  SAVINGS: "Savings",
  INVESTMENTS: "Investments",
  GIFTS: "Gifts",
  SUBSCRIPTIONS: "Subscriptions",
  CHILDCARE: "Childcare",
  TRAVEL: "Travel",
  TAXES: "Taxes",
  OTHER: "Other",
} as const;

export type Transaction = Income | Expense;