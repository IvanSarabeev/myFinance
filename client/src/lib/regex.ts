export const CHARACTERS_REGEX = /^\w{3,20}/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Complete Password Regex
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Common Character Regex
export const UPPER_CASE_CHARACTER = /[A-Z]/;
export const NUMERIC_CHARACTER = /\d/;
export const SPECIAL_CHARACTER = /[!@#$%^&*]/;
export const IS_NUMERIC =  /\d/;