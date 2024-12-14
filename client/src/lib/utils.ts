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