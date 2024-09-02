export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "blurt",
  description: "whatever somes to mind",
  navItems: [
    {
      label: "Feed",
      href: "/feed",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
  },
};
