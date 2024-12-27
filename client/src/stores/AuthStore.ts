import { action, makeObservable, observable, runInAction } from "mobx";
import { User } from "@/types/userTypes";
import { RegisterUserResponse } from "@/types/authTypes";
import { registerUser } from "@/app/api/auth";
import { HTTP_RESPONSE_STATUS } from "@/defines";
import { NOTIFICATION_TYPES, ToastVariants } from "@/types/commonTypes";
import { ApiErrorResponse } from "@/types/utilTypes";
import { FormikErrors } from "formik";

type OpenNotificationType = (type: ToastVariants, title: string, message: string) => void;

class AuthStore {
    isLoading = false;
    errorFields: Set<string> = new Set();
    data: RegisterUserResponse | null = null;
    showRequestEmailValidationModal = false;
    error: ApiErrorResponse | null = null;

    constructor() {
        makeObservable(this, {
            isLoading: observable,
            errorFields: observable,
            data: observable,
            showRequestEmailValidationModal: observable,

            // Actions
            registerUser: action,
            closeRequestEmailValidationModal: action,
        });
    }

    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async registerUser(user: User, userStore: any, openNotification: OpenNotificationType, setFormikErrors: (errors: FormikErrors<User>) => void) {
        this.isLoading = true;

        try {
            const response = await registerUser(user);

            runInAction(() => {
                const { status, showModal, message } = response.data;

                if (
                    status && showModal &&
                    response.status === HTTP_RESPONSE_STATUS.CREATED
                ) {
                    this.errorFields.clear();
                    this.data = {...response.data};
                    this.showRequestEmailValidationModal = showModal;
                    userStore.setUser(user);

                    openNotification(
                        NOTIFICATION_TYPES.SUCCESS,
                        NOTIFICATION_TYPES.SUCCESS.toLocaleUpperCase(),
                        message,
                    )
                }
            });
        } catch (error: unknown) {
            this.isLoading = false;

            this.error = error as ApiErrorResponse;
            
            if (this.error.response) {
                const {errorFields, message} = this.error.response;
                const newMessage = String(message ?? this.error.message);
                
                openNotification(
                    NOTIFICATION_TYPES.DESTRUCTIVE,
                    NOTIFICATION_TYPES.ERROR.toLocaleUpperCase(),
                    newMessage,
                );
                
                if (Array.isArray(errorFields) && errorFields.length > 0) {
                    this.errorFields = new Set(errorFields);
                    setFormikErrors(Object.fromEntries(
                        errorFields.map((field) => [field, `${field} is invalid`]),
                    ));
                } else {
                    openNotification(
                        NOTIFICATION_TYPES.DESTRUCTIVE,
                        NOTIFICATION_TYPES.ERROR.toUpperCase(),
                        newMessage ?? "An unexpected error occurred. Please try again."
                    );
                }
            }
            
            throw error;
        } finally {
            runInAction(() => {
                this.isLoading = false;
            })
        }
    }

    closeRequestEmailValidationModal() {
        this.showRequestEmailValidationModal = !this.showRequestEmailValidationModal;
    }
};

const authStore = new AuthStore();

export default authStore;