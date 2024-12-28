export const site = {
  title: "E-learning",
  description:
    "Welcome to the E-Learning Platform, an online teaching and learning hub where educators can share their knowledge with students from around the globe. This platform empowers teachers to create, manage, and sell their courses while offering students a seamless experience to learn and grow at their own pace.",
} as const;

export const menu = {
  main: [
    { name: "Login", to: "/login" },
    { name: "Register", to: "/register" },
  ],

  dashboard: [
    { name: "Dashboard", to: "/dashboard" },
    { name: "Customers", to: "/dashboard/customers" },
    { name: "Courses", to: "/dashboard/courses" },
    { name: "Settings", to: "/dashboard/settings" },
  ],

  settings: [
    {
      name: "General",
      to: "/dashboard/settings",
    },
    {
      name: "Profile",
      to: "/dashboard/settings/profile",
    },
    {
      name: "Bliing",
      to: "/dashboard/settings/billing",
    },
    {
      name: "Activity",
      to: "/dashboard/settings/activity",
    },
    {
      name: "Security",
      to: "/dashboard/settings/security",
    },
    {
      name: "Notifications",
      to: "/dashboard/settings/notifications",
    },
    {
      name: "Password",
      to: "/dashboard/settings/password",
    },
  ],
} as const;
