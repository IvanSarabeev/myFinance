import {
  Bell,
  BadgeCheck,
  CreditCard,
  LogOut,
  Sparkles,
  WalletMinimal,
  House,
  CircleHelp,
  ArrowRightLeft,
  Settings,
  ChartNetwork,
} from 'lucide-react';

/**
 * General Navigation Data through the User's Account
 */
export const navData = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/account/dashboard',
      icon: House,
    },
    {
      title: 'Finance',
      url: '#',
      icon: ArrowRightLeft,
      items: [
        {
          title: 'Dashboard',
          url: '/account/transaction',
        },
        {
          title: 'New Transaction',
          url: '/account/transaction/create',
        },
        {
          title: 'History',
          url: '/account/transaction/history',
        },
      ],
    },
    {
      title: 'Wallet',
      url: '/account/wallet/overview',
      icon: WalletMinimal,
    },
    {
      title: 'Activity',
      url: '/account/activity',
      icon: ChartNetwork,
    },
  ],
  navSecondary: [
    {
      title: 'Help Center',
      url: '/account/contact-us',
      icon: CircleHelp,
    },
    {
      title: 'Settings',
      url: '/account/settings',
      icon: Settings,
    },
  ],
};

/**
 * Profile Navigation
 */
export const userProfileNavigation = [
  {
    id: 1,
    title: 'Profile',
    url: '/account/profile',
    icon: BadgeCheck,
  },
  {
    id: 2,
    title: 'Documents',
    url: '/account/profile/documents',
    icon: CreditCard,
  },
  {
    id: 3,
    title: 'Notifications',
    url: '/account/notifications',
    icon: Bell,
  },
  {
    id: 4,
    title: 'Upgrade to Pro',
    url: '/account/profile/subscription',
    icon: Sparkles,
  },
  {
    id: 5,
    title: 'Log out',
    url: '#',
    icon: LogOut,
  },
] as const;
