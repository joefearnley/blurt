export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "blurt",
  description: "whatever comes to mind",
  navItems: [
    {
      label: "Feed",
      href: "/feed",
    },
    {
      label: "Login",
      href: "/login",
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
    github: "https://github.com/joefearnley/blurt",
  },
  cookieDefaults: {
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    domain: process.env.HOST ?? "localhost",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  }
};
