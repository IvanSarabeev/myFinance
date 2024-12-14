import { action, makeObservable, observable } from "mobx";
import { toast } from "@/hooks/use-toast";
import { ToastVariants } from "@/types/commonTypes";

class CommonStore {
    isLoading = false;
    notification: Notification[] = [];

    constructor() {
        makeObservable(this, {
            isLoading: observable,
            notification: observable,
            
            // # Actions
            showLoader: action,
            hideLoader: action, 
            showEmailOtpModal: action,
        });
    }

    showLoader() {
        this.isLoading = true;
    }

    hideLoader() {
        this.isLoading = false;
    }

    // TODO: Think is it neccessery to be used in here ?
    showEmailOtpModal(
        type: ToastVariants = "default",
        message: string,
        showModal: boolean = false,
        ) {
        toast({
            variant: type,
            title: type === "success" ? "Success!": "Notification",
            description: message,
        });
        
        console.log(showModal);
    }
};

const commonStore = new CommonStore();

export default commonStore;