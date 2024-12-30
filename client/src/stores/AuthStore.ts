import { action, makeObservable, observable, runInAction } from "mobx";
import { LoginUser, RegisterUser } from "@/types/userTypes";
import { ExternalProviderResponse, RegisterUserResponse } from "@/types/authTypes";
import { google, loginUser, registerUser } from "@/app/api/auth";
import { AUTH_OPERATION_TYPES, HTTP_RESPONSE_STATUS } from "@/defines";
import { NOTIFICATION_TYPES } from "@/types/commonTypes";
import { ApiErrorResponse } from "@/types/utilTypes";
import { FormikErrors } from "formik";
import userStore from "./UserStore";
import commonStore from './CommonStore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebase } from "@/lib/firebase";

class AuthStore {
    private readonly AUTH_TOKEN = "authToken";

    isLoading = false;
    errorFields: Set<string> = new Set();
    data: RegisterUserResponse | null = null;
    oAuthData: ExternalProviderResponse | null = null;
    showRequestEmailValidationModal = false;
    error: ApiErrorResponse | null = null;
    isAuthenticated = false;
    token: string | undefined = undefined;

    constructor() {
        makeObservable(this, {
            isLoading: observable,
            errorFields: observable,
            data: observable,
            showRequestEmailValidationModal: observable,
            isAuthenticated: observable,
            token: observable,

            // Actions
            registerUser: action,
            setToken: action,
            getToken: action,
            clearToken: action,
            loginUser: action,
            closeRequestEmailValidationModal: action,
            google: action,
        });
    }

    async registerUser(user: RegisterUser, setFormikErrors: (errors: FormikErrors<RegisterUser>) => void) {
        this.isLoading = true;
        this.error = null;

        if (!user) {
            return;
        }

        try {
            this.errorFields.clear();
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

                    commonStore.openNotification(
                        NOTIFICATION_TYPES.SUCCESS,
                        NOTIFICATION_TYPES.SUCCESS.toLocaleUpperCase(),
                        message,
                    );
                }
            });
        } catch (error: unknown) {
            this.isLoading = false;

            this.error = error as ApiErrorResponse;
            
            if (this.error.response) {
                const {errorFields, message} = this.error.response;
                const newMessage = String(message ?? this.error.message);
                
                commonStore.openNotification(
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
                    commonStore.openNotification(
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

    setToken(value: string | undefined) {
        runInAction(() => {
            this.token = value;
            this.isAuthenticated = true;
            localStorage.setItem(this.AUTH_TOKEN, value ?? "");
        });
    }

    getToken() {
        return this.token;
    }

    clearToken() {
        this.token = undefined;
        localStorage.removeItem(this.AUTH_TOKEN);
    }

    async loginUser(user: LoginUser, setFormikErrors: (errors: FormikErrors<LoginUser>) => void) {
        this.isLoading = true;
        this.error = null;

        if (!user) {
            return;
        }

        try {
            const response = await loginUser(user);
            console.log("Store response:", response);
            
            runInAction(() => {
                const {status, message, token} = response.data;
                console.log("Store Data:", response.data);

                if (status && response.status === HTTP_RESPONSE_STATUS.OK) {
                    this.errorFields.clear();
                    this.data = {...response.data};
                    commonStore.openNotification(
                        NOTIFICATION_TYPES.SUCCESS,
                        NOTIFICATION_TYPES.SUCCESS.toLocaleUpperCase(),
                        message,
                    );
                    this.setToken(token);
                }
            })
        } catch (error: unknown) {
            this.error = error as ApiErrorResponse;

            if (this.error.response) {
                const {errorFields, message} = this.error.response;
                const responseMessage = String(message ?? this.error.message);

                commonStore.openNotification(
                    NOTIFICATION_TYPES.DESTRUCTIVE,
                    NOTIFICATION_TYPES.ERROR.toLocaleUpperCase(),
                    responseMessage,
                );

                if (Array.isArray(errorFields) && errorFields.length > 0) {
                    this.errorFields = new Set(errorFields);
                    setFormikErrors(Object.fromEntries(errorFields.map((field) => [`${field} - Invalid field`])))
                }
            }

            throw error;
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    /**
     * Authenticate/Register User through 3th party API
     */
    async google() {
        this.isLoading = true;

        try {
            const auth = getAuth(firebase);
            const provider = new GoogleAuthProvider();
            const googleResponse = await signInWithPopup(auth, provider);

            if (
                googleResponse.user.emailVerified &&
                googleResponse.operationType === AUTH_OPERATION_TYPES.SIGN_IN
            ) {
                console.log("Store googleResponse:", googleResponse);
                const { displayName, email, photoURL } = googleResponse.user;
                const data = {
                    name: displayName,
                    email,
                    photo: photoURL,
                    fingerPrint: userStore.getFingerPrint(),
                };

                const response = await google(data);
                const {status, message, token} = response.data;

                console.log("Store API Response:", response);

                if (status && response.status === HTTP_RESPONSE_STATUS.OK) {
                    runInAction(() => {
                        this.oAuthData = {...response.data.data, ...response.data};
                        this.setToken(token);
                        commonStore.openNotification(
                            NOTIFICATION_TYPES.SUCCESS,
                            NOTIFICATION_TYPES.SUCCESS.toLocaleUpperCase(),
                            message,
                        );
                        userStore.setExternalUser(response.data.data);
                    })
                } else {
                    this.clearToken();
                    runInAction(() => {
                        commonStore.openNotification(
                            NOTIFICATION_TYPES.DESTRUCTIVE,
                            NOTIFICATION_TYPES.ERROR.toLocaleUpperCase(),
                            message,
                        );
                    });
                }
            } else {
                commonStore.openNotification(
                    NOTIFICATION_TYPES.SUCCESS,
                    NOTIFICATION_TYPES.SUCCESS.toLocaleUpperCase(),
                    "Unable to process your request",
                );
            }
        } catch (error) {
            this.isLoading = false;
            console.error("Store Error:", error);

            throw error;
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    };
};

const authStore = new AuthStore();

export default authStore;