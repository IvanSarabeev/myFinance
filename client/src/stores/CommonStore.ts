import { action, makeObservable, observable } from "mobx";
import { toast } from "@/hooks/use-toast";
import { ToastVariants } from "@/types/defaults";

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
            openNotification: action,
        });
    }

    showLoader() {
        this.isLoading = true;
    }

    hideLoader() {
        this.isLoading = false;
    }

    /**
     * Open Notification Toast, to inform user actions
     * 
     * @param type
     * @param title 
     * @param message 
     */
    openNotification(type: ToastVariants = "default", title: string, message: string) {
        toast({
            variant: type,
            title: title,
            description: message,
        });
    }
};

const commonStore = new CommonStore();

export default commonStore;