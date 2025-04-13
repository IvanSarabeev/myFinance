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