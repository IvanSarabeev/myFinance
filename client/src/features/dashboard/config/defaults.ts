import { 
  Bell, BadgeCheck, CreditCard, LogOut, Sparkles, BookOpen,
  House, LifeBuoy, WalletMinimal, Send, Settings2,
}  from "lucide-react";

/**
 * General Navigation Data through the User's Account
 */
export const navData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: House,
      isActive: true,
    },
    {
      title: "Transactions account",
      url: "#",
      icon: WalletMinimal,
      items: [
        {
          title: "Dashboard",
          url: "/account/transaction/dashboard",
        },
        {
          title: "Create",
          url: "/account/transaction/create",
        },
        {
          title: "History",
          url: "/account/transaction/history",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/account/profile/settings",
        },
        {
          title: "Team",
          url: "/account/team/settings",
        },
        {
          title: "Billing",
          url: "/account/subscriptions/history",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "/account/support",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "/account/feedback",
      icon: Send,
    },
  ],
};

/**
 * Profile Navigation
 */
export const userProfileNavigation = [
  { 
    id: 1,
    title: "Profile", 
    url: "/account/profile", 
    icon: BadgeCheck 
  },
  {
    id: 2,
    title: "Documents",
    url: "/account/profile/documents",
    icon: CreditCard,
  },
  {
    id: 3,
    title: "Notifications",
    url: "/account/notifications",
    icon: Bell,
  },
  {
    id: 4,
    title: "Upgrade to Pro",
    url: "/account/profile/subscription",
    icon: Sparkles,
  },
  { 
    id: 5, 
    title: "Log out", 
    url: "#", 
    icon: LogOut 
  },
] as const;