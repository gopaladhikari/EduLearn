export const site = {
	title: "Admin | E learning",
	description: "Welcome to E-learning",
} as const;

export const menu = {
	main: [
		{ name: "Login", to: "/login" },
		{ name: "Register", to: "/register" },
	],
} as const;
