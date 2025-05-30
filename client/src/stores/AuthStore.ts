import { action, makeObservable, observable, runInAction } from "mobx";
import { confirmPasswordReset, forgottenUserPassword, github as githubApi, google as googleApi, loginUser, logoutUser, registerUser } from "@/app/api/auth";
import { AUTH_OPERATION_TYPES, HTTP_RESPONSE_STATUS } from "@/defines";
import { FormikErrors } from "formik";
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebase } from "@/lib/firebase";
import userStore from "./UserStore";
import commonStore from './CommonStore';
import sessionStore from "./SessionStore";
import modalStore from "./ModalStore";
import { RegisterUserResponse } from "@/types/auth/api/index";
import { NOTIFICATION_TYPES } from "@/types/defaults";
import { ApiErrorResponse } from "@/types/defaultApi";
import { ConfirmForgottenPasswordData, InitialForgottenPasswordData, LoginUserData, RegisterUserData } from "@/types/auth";
import { UserDetails } from "@/types/user";

class AuthStore {
    private readonly GOOGLE_TYPE = "google";

    isLoading = false;
    errorFields: Set<string> = new Set();
    authData: RegisterUserResponse | null = null;
    error: ApiErrorResponse | null = null;

    constructor() {
        makeObservable(this, {
            isLoading: observable,
            errorFields: observable,
            authData: observable,
            error: observable,
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
    async registerUser(
        user: RegisterUserData,
        setFormikErrors: (errors: FormikErrors<RegisterUserData>) => void
    ) {
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
                    modalStore.setRequestedEmailVerificationModal({ message, email: user.email });
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
     * Authenticate User to the system
     * 
     * @param user 
     * @param setFormikErrors 
     */
    async loginUser(
        user: LoginUserData, 
        setFormikErrors: (errors: FormikErrors<LoginUserData>) => void
    ) {
        this.setLoading(true);

        try {
            this.errorFields.clear();
            const response = await loginUser(user);
            
            runInAction(() => {
                const {status, message, token, data} = response.data;

                if (status && response.status === HTTP_RESPONSE_STATUS.OK) {
                    if (token !== undefined && typeof token === "string") {
                        runInAction(() => {
                            this.authData = {...response.data};
                            this.handleAuthResponse(token, message, data);
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
     * @param {Object} user
     * @returns {VoidFunction}
     */
    handleAuthResponse(token: string, message: string, user: UserDetails): void {
        runInAction(() => {
            sessionStore.setToken(token);
            sessionStore.setAuthenticated(true);
            sessionStore.setUserDetails(user);

            userStore.setUserDetails(user);

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
     * @param setFormikErrors
     */
    async forgottenPassword(
        email: string, 
        setFormikErrors: (errors: FormikErrors<InitialForgottenPasswordData>) => void,
    ) {
        this.setLoading(true);

        try {
            this.errorFields.clear();
            const result = await forgottenUserPassword(email);

            runInAction(() => {
                const {status, message, showRequestedModal} = result.data;

                if (status && result.status === HTTP_RESPONSE_STATUS.CREATED) {
                    if (showRequestedModal) {
                        modalStore.setRequestedForgotPasswordModal({ email, message });
                    }

                    commonStore.openNotification(
                        NOTIFICATION_TYPES.SUCCESS,
                        "Email Sent",
                        message,
                    );
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

        } finally {
            this.setLoading(false);   
        };
    }
    
    async confirmForgottenPassword(
        data: ConfirmForgottenPasswordData,
        setFormikErrors: (errors: FormikErrors<InitialForgottenPasswordData>) => void,
    ) {
        this.setLoading(true);

        try {
            this.errorFields.clear();

            const response = await confirmPasswordReset(data);
            const {status, message, errorFields} = response.data;

            if (status && response.status === HTTP_RESPONSE_STATUS.OK) {
                commonStore.openNotification(
                    NOTIFICATION_TYPES.SUCCESS,
                    "Congratulations",
                    message,
                );
            } else if (Array.isArray(errorFields) && errorFields.length > 0) {
                this.errorFields = new Set(errorFields);

                setFormikErrors(Object.fromEntries(
                    errorFields.map((field) => [field, `${field} is invalid`]),
                ));

                commonStore.openNotification(
                    NOTIFICATION_TYPES.DESTRUCTIVE,
                    "Wrong credentials! Try again.",
                    message,
                );
            }
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
        } finally {
            this.setLoading(false);
        }
    }
};

const authStore = new AuthStore();

export default authStore;