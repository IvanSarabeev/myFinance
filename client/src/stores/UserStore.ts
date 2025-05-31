import { makeObservable, observable, action, runInAction } from 'mobx';
import { ClientJS } from 'clientjs';
import type {
  UserFingerPrint,
  ExternalUser,
  UserDetails,
  InternalUser,
  Account,
  AccountType,
  CurrencyType,
} from '@/types/user';
import { format } from 'date-fns';
import sessionStore from './SessionStore';

class UserStore {
  user: InternalUser = {
    name: '',
    email: '',
    password: '',
    terms: false,
  };
  userDetails: UserDetails = {
    id: '',
    name: '',
    email: '',
    avatar: '',
    role: [],
    verified: false,
    userAvatar: '',
    userFingerprint: {
      userAgent: '',
      browser: '',
      os: '',
      cpu: '',
      mobile: 0,
      timeZone: '',
      deviceType: 0,
      language: '',
      lastActive: '',
    },
  };
  externalUser: ExternalUser = {
    name: '',
    email: '',
    terms: false,
    photoUrl: '',
    isVerified: false,
    userFingerPrint: this.userDetails.userFingerprint,
  };

  account: Account = {
    id: '',
    walletId: '',
    name: '',
    currency: '' as keyof CurrencyType,
    balance: '',
    description: '',
    icon: '',
    type: '' as keyof AccountType,
    active: false,
  };

  constructor() {
    makeObservable(this, {
      user: observable,
      userDetails: observable,
      externalUser: observable,
      account: observable,

      // Actions
      setUser: action,
      getFingerPrint: action,
      getUserDetails: action,
      setExternalUser: action,
      getExternalUser: action,
      setAccount: action,
    });
  }

  /**
   * set User Data
   *
   * @param data
   */
  setUser(data: Partial<InternalUser>) {
    runInAction(() => {
      this.user = {
        ...this.user, // Preserve existing data
        ...data, // Override with new data
      };
    });
  }

  /**
   * Get User's internal Browser information
   *
   * @returns {Object}
   */
  getFingerPrint(): UserFingerPrint {
    const client = new ClientJS();
    const todayDate = new Date();
    const formattedDate = format(todayDate, `yyyy-MM-dd HH:mm:ss`);

    return {
      userAgent: client.getUserAgent(),
      browser: client.getBrowser(),
      os: client.getOS(),
      cpu: client.getCPU(),
      mobile: client.isMobile() ? 0 : 1,
      deviceType: client.isMobile() ? 0 : 1,
      timeZone: client.getTimeZone(),
      language: client.getLanguage(),
      lastActive: formattedDate,
    };
  }

  setUserDetails(data: UserDetails) {
    runInAction(() => {
      this.userDetails = {
        ...this.userDetails,
        ...data,
      };
    });
  }

  getUserDetails(): UserDetails | null {
    const userData = sessionStorage.getItem(sessionStore.USER_DETAILS);
    let parsedData: Partial<UserDetails> = {};

    if (userData) {
      try {
        parsedData = JSON.parse(userData);
      } catch (error) {
        console.error(`Failed to parse user data: ${error}`);
      }
    }

    return {
      ...this.userDetails,
      ...this.getFingerPrint(),
      ...parsedData,
    };
  }

  setExternalUser(data: Partial<ExternalUser>) {
    runInAction(() => {
      this.externalUser = {
        ...this.externalUser,
        ...data,
      };
    });
  }

  getExternalUser() {
    return this.externalUser;
  }

  setAccount(key: keyof Account, value: Account) {
    this.account = {
      ...this.account,
      [key]: value,
    };
  }
}

const userStore = new UserStore();

export default userStore;
