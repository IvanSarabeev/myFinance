import { action, makeObservable, observable, runInAction } from "mobx";
import { MODAL_TYPES } from "@/defines";
import { ModalType } from "@/types/defaults";

class ModalStore {
    isOpen: boolean = false;
    modalName: ModalType | null = null;
    modalProps: Record<string, unknown> = {};

    constructor() {
        makeObservable(this, {
            isOpen: observable,
            modalName: observable,
            modalProps: observable,
            openModal: action,
            closeModal: action,
            setRequestedEmailVerificationModal: action,
            closeRequestedEmailVerificationModal: action,
            setRequestedForgotPasswordModal: action,
            closeRequestedForgotPasswordModal: action,
            setRequestedInitialWalletSetupModal: action,
        });
    }

    /**
     * Opens a modal by name
     * 
     * @param {ModalType} modalName 
     * @param {Object} modalProps
     * @returns {VoidFunction}
     */
    openModal(modalName: ModalType, modalProps: Record<string, unknown> = {}): void {
        runInAction(() => {
            this.isOpen = true;
            this.modalName = modalName;
            this.modalProps = modalProps;
        });
    }

    /**
     * Close any open modal and reset its state
     * @returns {VoidFunction}
     */
    closeModal(): void {
        runInAction(() => {
            if (typeof this.modalProps.onClose === "function") {
                this.modalProps.onClose();
            }
            
            this.isOpen = false;
            this.modalName = null;
            this.modalProps = {};
        });
    }

    /**
     * Open the requested email verification modal
     * @param {Object} props 
     * @returns {VoidFunction}
     */
    setRequestedEmailVerificationModal(props: Record<string, unknown>): void {
        runInAction(() => {
            this.openModal(MODAL_TYPES.EMAIL_VERIFICATION, props);
        });
    }

    /**
     * Close the requested email verification modal
     * @returns {VoidFunction}
     */
    closeRequestedEmailVerificationModal(): void {
        this.closeModal();
    }

    /**
     * Open the requested forgot password modal
     * @param {Object} props
     * @returns {VoidFunction}
     */
    setRequestedForgotPasswordModal(props: Record<string, unknown>): void {
        runInAction(() => {
            this.openModal(MODAL_TYPES.FORGOTTEN_PASSWORD, props);
        });
    }

    /**
     * Close the requested forgot password modal
     * @returns {VoidFunction}
     */
    closeRequestedForgotPasswordModal(): void {
        this.closeModal();
    }

    /**
     * Open the requested initial wallet setup modal
     * @param {Object} props
     * @returns {VoidFunction}
     */
    setRequestedInitialWalletSetupModal(props: Record<string, unknown>): void {
        runInAction(() => {
            this.openModal(MODAL_TYPES.INITIAL_WALLET_SETUP, props);
        });
    }
}

const modalStore = new ModalStore();

export default modalStore;