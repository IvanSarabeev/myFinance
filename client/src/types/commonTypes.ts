export type ToastVariants = "info" | "warning" | "success" | "destructive" | "default" ;


export type ToastNotification = {
    type: ToastVariants,
    message: string,
    showModa: boolean,
}