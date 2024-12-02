export const site = {
	title: "Admin | E learning",
	description: "Welcome to E-learning",
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
