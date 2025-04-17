import { INITIAL_WALLET_TYPES } from "@/configs/wallet";

/**
 * Base wallet creation
 */
interface BaseWalletCreation {
    name: string;
    customEnabled: false;
}

/**
 * Additional properties 
 * for cases where customEnabled is true
 */
type AdditionalWalletCreationProperties = {
    currency: string;
    initialDeposit: number;
    accountName: string;
    type: typeof INITIAL_WALLET_TYPES;
}

/**
 * For Custom creation of wallet
 */
interface CustomWalletCreation extends AdditionalWalletCreationProperties {
    name: string;
    customEnabled: true;
}

/**
 * Discriminated Union for dynamic (Strict) content,
 * when creating the User's initial wallet
 */
export type CreateWalletData =
    | BaseWalletCreation
    | CustomWalletCreation
;

export type WalletSteps = "Initial" | "CustomAccount" | "CustomWallet" | "Default";
export type WalletCreationSteps = "Create" | "Confirm" | "Success";