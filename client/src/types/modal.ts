export interface EmailVerificationModalProps {
    email: string;
    message: string;
    onClose: () => void;
}

export interface ForgotPasswordModalProps {
    message: string;
    onClose: () => void;
}