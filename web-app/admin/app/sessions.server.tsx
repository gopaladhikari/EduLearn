import { createCookieSessionStorage } from "@remix-run/node";
import { createThemeSessionResolver } from "remix-themes";

const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: "theme",
		path: "/",
		httpOnly: true,
		sameSite: "lax",
		secrets: ["secret"],
	},
});

export const themeSessionResolver =
	createThemeSessionResolver(sessionStorage);
