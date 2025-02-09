export const COMMON_REGEXS = Object.freeze({
    CHARACTERS_LENGTH_REGEX: /^\w{3,20}/,
    EMAIL: /\S+@\S+\.\S+/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
});

// Common Regex Patterns
export const UPPER_CASE_CHARACTER = /[A-Z]/;
export const NUMERIC_CHARACTER = /\d/;
export const SPECIAL_CHARACTER = /[!@#$%^&*]/;
export const IS_NUMERIC =  /\d/;


export const REMOVE_LEADING_TRAILING_QUOTES = /^['"]|['"]$/g;