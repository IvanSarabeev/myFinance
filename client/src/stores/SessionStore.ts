import { makeObservable, observable, action } from 'mobx';

/**
 * @class SessionStore - containing security and session managing tools
 */
class SessionStore {
    private readonly IS_AUTHENTICATED = "isAuthenticated";
    private readonly AUTH_TOKEN = "authToken";

    isAuthenticated = false;
    token = "";

    constructor(){
        makeObservable(this, {
            isAuthenticated: observable,
            token: observable,

            // Actions
            setAuthenticated: action,
            setToken: action,
            clearSession: action,
        });

        this.initializeSession();
    };

    /**
     * Set is Authenticated and persist via sessionStorage
     * 
     * @param {Boolean} value
     * @returns {void} 
     */
    setAuthenticated(value: boolean): void {
        this.isAuthenticated = value;
        sessionStorage.setItem(this.IS_AUTHENTICATED, JSON.stringify(value));
    }

    /**
     * Set token and persist through sessionStorage
     * 
     * @param {String} value
     * @returns {void} 
     */
    setToken(value: string | undefined): void {
        if (typeof value === "string" && value.trim().length > 0) {
            this.token = value;
            sessionStorage.setItem(this.AUTH_TOKEN, JSON.stringify(value));
        } else {
            throw new Error("Invalid token, Please contact the support team!");
        }
    }

    /**
     * Initialize session using sessionStorage
     * 
     * @returns {void}
     */
    initializeSession(): void {
        const savedIsAuthenticated = sessionStorage.getItem(this.IS_AUTHENTICATED);

        if (savedIsAuthenticated !== null) {
            this.isAuthenticated = JSON.parse(savedIsAuthenticated);
        }

        const savedToken = sessionStorage.getItem(this.AUTH_TOKEN);

        if (savedToken !== null) {
            this.token = JSON.parse(savedToken);
        }
    }

    /**
     * Clear all related data to authentication from the sessionStorage
     * 
     * @returns {void}
     */
    clearSession(): void {
        this.isAuthenticated = false;
        this.token = "";
        sessionStorage.removeItem(this.IS_AUTHENTICATED);
        sessionStorage.removeItem(this.AUTH_TOKEN);
    }
}

const sessionStore = new SessionStore();

export default sessionStore;