import { action, makeObservable, observable, runInAction } from "mobx";
import { forgottenUserPassword, github as githubApi, google as googleApi, loginUser, logoutUser, registerUser } from "@/app/api/auth";
import { AUTH_OPERATION_TYPES, HTTP_RESPONSE_STATUS } from "@/defines";
import { FormikErrors } from "formik";
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebase } from "@/lib/firebase";
import userStore from "./UserStore";
import commonStore from './CommonStore';
import sessionStore from "./SessionStore";
import { RegisterUserResponse } from "@/types/authTypes";
import { ForgottenPassword, LoginUser, PartialUser, RegisterUser } from "@/types/userTypes";
import { NOTIFICATION_TYPES } from "@/types/commonTypes";
import { ApiErrorResponse } from "@/types/utilTypes";

class AuthStore {
    private readonly GOOGLE_TYPE = "google";

    isLoading = false;
    errorFields: Set<string> = new Set();
    authData: RegisterUserResponse | null = null;
    showRequestEmailValidationModal = false;
    error: ApiErrorResponse | null = null;

    constructor() {
        makeObservable(this, {
            isLoading: observable,
            errorFields: observable,
            authData: observable,
            error: observable,
            showRequestEmailValidationModal: observable,
            closeRequestEmailValidationModal: action,
            setRequestEmailModal: action,
            setLoading: action,
            registerUser: action,
            loginUser: action,
            authenticatedWithProvider: action,
            handleAuthResponse: action,
            logoutUser: action,
            forgottenPassword: action,
        });
    }

    /**
     * @param {Boolean} state 
     * @returns {VoidFunction}
     */
    setLoading(state: boolean): void {
        runInAction(() => {
            this.isLoading = state;
        });
    }

    /**
     * Create new User instance
     * 
     * @param user 
     * @param setFormikErrors 
     */
    async registerUser(user: RegisterUser, setFormikErrors: (errors: FormikErrors<RegisterUser>) => void) {
        this.setLoading(true);

        try {
            this.errorFields.clear();
            const response = await registerUser(user);

            runInAction(() => {
                const { status, showModal, message } = response.data;

                if (
                    status && showModal &&
                    response.status === HTTP_RESPONSE_STATUS.CREATED
                ) {
                    this.authData = {...response.data};
                    this.setRequestEmailModal(showModal);
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
            this.setLoading(false);
        }
    }

    /**
     * @param {boolean} state
     * @returns {VoidFunction}
     */
    setRequestEmailModal(state: boolean): void {
        this.showRequestEmailValidationModal = state;
    }

    /**
     * @returns {VoidFunction}
     */
    closeRequestEmailValidationModal(): void {
        this.showRequestEmailValidationModal = !this.showRequestEmailValidationModal;
    }

    /**
     * Authenticate User to the system
     * 
     * @param user 
     * @param setFormikErrors 
     */
    async loginUser(user: LoginUser, setFormikErrors: (errors: FormikErrors<LoginUser>) => void) {
        this.setLoading(true);

        try {
            this.errorFields.clear();
            const response = await loginUser(user);
            
            runInAction(() => {
                const {status, message, token, userInfo} = response.data;

                if (status && response.status === HTTP_RESPONSE_STATUS.OK) {
                    if (token !== undefined && typeof token === "string") {
                        runInAction(() => {
                            this.authData = {...response.data};
                            this.handleAuthResponse(token, message, userInfo);
                        });
                    }
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
            this.setLoading(false);
        }
    }

    /**
     * Authenticated/Register User through 3-th part oAuth
     * 
     * @param {String} providerType
     */
    async authenticatedWithProvider(providerType: "google" | "github"): Promise<void> {
        this.setLoading(true);

        try {
            const auth = getAuth(firebase);
            const provider = providerType === this.GOOGLE_TYPE
                ? new GoogleAuthProvider()
                : new GithubAuthProvider();
            const response = await signInWithPopup(auth, provider);

            if (response.user.emailVerified && response.operationType === AUTH_OPERATION_TYPES.SIGN_IN) {
                const { email, displayName, photoURL } = response.user;
                const userData = {
                    name: displayName,
                    email,
                    photo: photoURL,
                    fingerPrint: userStore.getFingerPrint(),
                };

                const apiResponse = providerType === this.GOOGLE_TYPE 
                    ? await googleApi(userData)
                    : await githubApi(userData);

                const { status, message, token, data } = apiResponse.data;
                
                if (status && apiResponse.status === HTTP_RESPONSE_STATUS.OK) {
                    if (token !== undefined && token?.length > 0) {
                        this.handleAuthResponse(token, message, data);
                    }
                } else {
                    throw new Error(message || "Authentication failed.");
                }
            }
        } catch (error: unknown) {
            this.error = error as ApiErrorResponse;

            if (this.error.response) {
                const {message} = this.error.response;
                const responseMessage = String(message ?? this.error.message);

                commonStore.openNotification(
                    NOTIFICATION_TYPES.DESTRUCTIVE,
                    NOTIFICATION_TYPES.ERROR.toLocaleUpperCase(),
                    responseMessage ?? "Unable to process your request",
                );
            }
        } finally {
            this.setLoading(false);
        }
    }

    /**
     * Handle Succesful User authentication
     * 
     * @param {String} token 
     * @param {String} message 
     * @param {Object} userData
     * @returns {VoidFunction}
     */
    handleAuthResponse(token: string, message: string, userData: PartialUser): void {
        runInAction(() => {
            sessionStore.setToken(token);
            sessionStore.setAuthenticated(true);
            userStore.setUser(userData);

            commonStore.openNotification(
                NOTIFICATION_TYPES.SUCCESS,
                NOTIFICATION_TYPES.AUTHENTICATION_SUCCESS,
                String(message ?? "Unexpected error occured"),
            );
        });
    }

    /**
     * Sign out User from the System and it's security measures
     * 
     * @returns {Promise<VoidFunction>}
     */
    async logoutUser(): Promise<void> {
        this.setLoading(true);

        return Promise.allSettled([
            Promise.resolve(logoutUser()),
            Promise.resolve(sessionStore.clearSession()),
        ]).then(() => {
            commonStore.openNotification(
                NOTIFICATION_TYPES.INFO,
                "Redirected",
                "User signed out successfully!"
            );
        }).catch(() => {
            commonStore.openNotification(
                NOTIFICATION_TYPES.DESTRUCTIVE,
                "Under maintain",
                "Sorry we're under maintaince, feel free to contact our support team!"
            );
        })
        .finally(() => {
            this.setLoading(false);
        });
    }

    /**
     * Check if User has an email registered
     * 
     * @param {String} email 
     * @param setFormikErrors
     * @returns {Promise<false | undefined>}
     */
    async forgottenPassword(email: string, setFormikErrors: (errors: FormikErrors<ForgottenPassword>) => void): Promise<false | undefined> {
        this.setLoading(true);

        try {
            this.errorFields.clear();
            const result = await forgottenUserPassword(email);

            runInAction(() => {
                const {status, message, showRequestedModal} = result.data;

                if (status && result.status === HTTP_RESPONSE_STATUS.CREATED) {
                    this.setRequestEmailModal(showRequestedModal);
                    commonStore.openNotification(
                        NOTIFICATION_TYPES.SUCCESS,
                        "Email Sent",
                        message,
                    );

                    return true;
                }
            });

        } catch (error) {
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

            return false;
        } finally {
            this.setLoading(false);   
        };
    }
};

const authStore = new AuthStore();

export default authStore;