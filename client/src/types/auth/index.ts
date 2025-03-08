import { UserBase } from "../user";

/**
 * Contains the following properties
 * @argument {string} - User email
 * @argument {string} - User password
 */
export type LoginUserData = Pick<UserBase, "email"> & {
    password: string;
};

export type RegisterUserData = Pick<UserBase, "name" | "email" | "terms"> & {
    password: string;
};

export type InitialForgottenPasswordData = Pick<UserBase, "email">;

export type ConfirmForgottenPasswordData = Pick<UserBase, "email"> & {
    // TODO: Add flag -> enableFields
    password: string;
    confirm_password: string;
}

/**
 * Discriminated Union for dynamic (Strict) flow
 */
export type ForgottenPasswordFlow = 
    | InitialForgottenPasswordData
    | ConfirmForgottenPasswordData
;
