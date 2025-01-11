import { 
  Bell, BadgeCheck, CreditCard, LogOut, Sparkles, BookOpen,
  Frame, LifeBuoy, PieChart, Send, Settings2,
}  from "lucide-react";

/**
 * General Navigation Data through the User's Account
 */
export const navData = {
  navMain: [
    {
      title: "Profile Playground",
      url: "#",
      icon: Frame,
      isActive: true,
      items: [
        {
          title: "History",
          url: "/account/profile/history",
        },
        {
          title: "Starred",
          url: "/account/getting-started",
        },
        {
          title: "Settings",
          url: "/account/settings",
        },
      ],
    },
    {
      title: "Transactions",
      url: "#",
      icon: PieChart,
      items: [
        {
          title: "View",
          url: "/account/transaction/dashboard",
        },
        {
          title: "Create",
          url: "/account/transaction/create",
        },
        {
          title: "Quantum",
          url: "/account/transaction/store",
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
          url: "/account/profile",
        },
        {
          title: "Team",
          url: "/account/team",
        },
        {
          title: "Billing",
          url: "/account/subscriptions",
        },
        {
          title: "Limits",
          url: "/account/limits",
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
    title: "Upgrade to Pro",
    url: "/account/subscription",
    icon: Sparkles,
  },
  { 
    id: 2,
    title: "Profile", 
    url: "/account/profile", 
    icon: BadgeCheck 
  },
  {
    id: 3,
    title: "Transaction",
    url: "/account/transaction/dashboard",
    icon: CreditCard,
  },
  {
    id: 4,
    title: "Notifications",
    url: "/account/notifications",
    icon: Bell,
  },
  { 
    id: 5, 
    title: "Log out", 
    url: "/account/logout", 
    icon: LogOut 
  },
] as const;