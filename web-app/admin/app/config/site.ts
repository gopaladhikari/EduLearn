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
} as const;
