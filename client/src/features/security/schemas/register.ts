import { object, string, bool } from "yup";
import { CHARACTERS_REGEX, EMAIL_REGEX, PASSWORD_REGEX } from "@/lib/regex";

export const registerSchema = object().shape({
    name: string()
        .min(1, "Name must be at least 1 character")
        .max(40, "Name can't exceed 40 characters")
        .matches(CHARACTERS_REGEX, "Contains invalid characters")
        .required("Name is Required"),
    email: string()
        .min(5, "Email must be at least 5 characters")
        .max(60, "Email cannot exceed 60 characters")
        .matches(EMAIL_REGEX, "Invalid email address")
        .required("Email is Required"),
    password: string()
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password cannot exceed 20 characters")
        .matches(PASSWORD_REGEX, "Password contais invalid characters")
        .required("Password is Required"),
    terms: bool()
        .oneOf([true], "You must accept the terms and conditions")
        .default(false),
});

export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    terms: boolean;
}