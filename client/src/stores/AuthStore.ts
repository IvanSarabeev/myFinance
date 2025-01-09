import { action, makeObservable, observable, runInAction } from "mobx";
import { github, google, loginUser, registerUser } from "@/app/api/auth";
import { AUTH_OPERATION_TYPES, HTTP_RESPONSE_STATUS } from "@/defines";

// Libraries
import { FormikErrors } from "formik";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebase } from "@/lib/firebase";


// Stores
import userStore from "./UserStore";
import commonStore from './CommonStore';
import sessionStore from "./SessionStore";

// Types
import { ExternalProviderResponse, RegisterUserResponse } from "@/types/authTypes";
import { LoginUser, RegisterUser } from "@/types/userTypes";
import { NOTIFICATION_TYPES } from "@/types/commonTypes";
import { ApiErrorResponse } from "@/types/utilTypes";

class AuthStore {
    isLoading = false;
    errorFields: Set<string> = new Set();
    data: RegisterUserResponse | null = null;
    oAuthData: ExternalProviderResponse | null = null;
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
            loginUser: action,
            closeRequestEmailValidationModal: action,
            google: action,
            github: action,
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
                    sessionStore.setAuthenticated(true);
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

    async loginUser(user: LoginUser, setFormikErrors: (errors: FormikErrors<LoginUser>) => void) {
        this.isLoading = true;
        this.error = null;

        if (!user) {
            return;
        }

        try {
            const response = await loginUser(user);
            
            runInAction(() => {
                const {status, message, token} = response.data;

                if (status && response.status === HTTP_RESPONSE_STATUS.OK) {
                    this.errorFields.clear();
                    this.data = {...response.data};
                    sessionStore.setToken(token);
                    commonStore.openNotification(
                        NOTIFICATION_TYPES.SUCCESS,
                        NOTIFICATION_TYPES.SUCCESS.toLocaleUpperCase(),
                        message,
                    );
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
                const { displayName, email, photoURL } = googleResponse.user;
                const data = {
                    name: displayName,
                    email,
                    photo: photoURL,
                    fingerPrint: userStore.getFingerPrint(),
                };

                const response = await google(data);
                const {status, message, token} = response.data;

                if (status && response.status === HTTP_RESPONSE_STATUS.OK) {
                    runInAction(() => {
                        this.oAuthData = {...response.data.data, ...response.data};
                        userStore.setExternalUser(response.data.data);
                        sessionStore.setToken(token);
                        commonStore.openNotification(
                            NOTIFICATION_TYPES.SUCCESS,
                            NOTIFICATION_TYPES.SUCCESS.toLocaleUpperCase(),
                            message,
                        );
                    })
                } else {
                    runInAction(() => {
                        sessionStore.clearSession();
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

            throw error;
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    };

    /**
     * Authenticate/Register User through 3th party API
     */
    async github() {
        this.isLoading = true;

        try {
            const auth = getAuth(firebase);
            const provider = new GoogleAuthProvider();
            const githubResponse = await signInWithPopup(auth, provider);

            if (
                githubResponse.user.emailVerified &&
                githubResponse.operationType === AUTH_OPERATION_TYPES.SIGN_IN
            ) {
                const { displayName, email, photoURL } = githubResponse.user;
                const data = {
                    name: displayName,
                    email,
                    photo: photoURL,
                    fingerPrint: userStore.getFingerPrint(),
                };

                const response = await github(data);
                const { status, message, token } = response.data;

                if (status && response.status === HTTP_RESPONSE_STATUS.OK) {
                    runInAction(() => {
                        this.oAuthData = {...response.data.data, ...response.data};
                        commonStore.openNotification(
                            NOTIFICATION_TYPES.SUCCESS,
                            NOTIFICATION_TYPES.SUCCESS.toLocaleUpperCase(),
                            message,
                        );
                        sessionStore.setToken(token);
                        userStore.setExternalUser(response.data.data);
                    })
                } else {
                    runInAction(() => {
                        sessionStore.clearSession();
                        commonStore.openNotification(
                            NOTIFICATION_TYPES.DESTRUCTIVE,
                            NOTIFICATION_TYPES.ERROR.toLocaleUpperCase(),
                            message,
                        );
                    });
                }
            }
        } catch (error) {
            this.isLoading = false;

            throw error;
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }
};

const authStore = new AuthStore();

export default authStore;