import { Transaction } from "@/types/features/defaults";
import { Income } from "@/types/features/income/api";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removeTrailingSlash(path: string) {
  return path.replace(/\/$/, "");
}

export function hasUpperCase(str: string) {
  return str !== str.toLocaleLowerCase();
}

export function capitalizeFirstLetter(value: string) {
  return value.replace(/^./, value[0].toLocaleUpperCase()); 
}

/**
 * @description Function to check if a string is valid (not empty and not null)
 * 
 * @param {string} value - String to check if it is a valid string 
 * @returns {boolean} Boolean value indicating if the string is valid or not
 */
export function isString(value: string | undefined): boolean {
  return typeof value === "string" && value.length > 0 && value !== "undefined";
};

/**
 * @description Function to format a number with thousand separators
 * 
 * @param value - Number to format with thousand separators
 * @returns {string} Formatted number with thousand separators
 */
export const addThousandSeparator = (value: number): string => {
  if (isNaN(value)) return '';

  const [integerPart, decimalPart] = value.toString().split('.');

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger; 
}

export function isIncome(transaction: Transaction): transaction is Income {
  return transaction.type === 'income';
}