export const site = {
  title: "EduLearn Admin",
  description:
    "Welcome to the EduLearn Platform, an online teaching and learning hub where educators can share their knowledge with students from around the globe. This platform empowers teachers to create, manage, and sell their courses while offering students a seamless experience to learn and grow at their own pace.",
} as const;

export const menu = {
  main: [
    { name: "Login", to: "/login" },
    { name: "Register", to: "/register" },
  ],

  auth: [
    { name: "Dashboard", to: "/dashboard" },
    { name: "Customers", to: "/customers" },
    { name: "Courses", to: "/courses" },
    { name: "Settings", to: "/settings" },
  ],

  settings: [
    {
      title: "Profile",
      href: "/settings",
    },
    {
      title: "Account",
      href: "/settings/account",
    },
    {
      title: "Appearance",
      href: "/settings/appearance",
    },
    {
      title: "Notifications",
      href: "/settings/notifications",
    },
    {
      title: "Display",
      href: "/settings/display",
    },
  ],
} as const;
