import { MODAL_TYPES } from "@/defines";

export type ToastVariants = "info" | "warning" | "success" | "destructive" | "default" ;


export type ToastNotification = {
    type: ToastVariants,
    message: string,
    showModa: boolean,
}

export enum NOTIFICATION_TYPES {
    INFO = "info",
    WARNING = "warning",
    SUCCESS = "success",
    DESTRUCTIVE = "destructive",
    ERROR = "error",
    DEFAULT = "default",
    AUTHENTICATION_SUCCESS = "Access Granted!"
}

export type ModalType = typeof MODAL_TYPES[keyof typeof MODAL_TYPES];