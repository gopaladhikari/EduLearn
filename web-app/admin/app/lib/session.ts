import { type SessionData } from "@remix-run/node";
import { createCookieSessionStorage } from "@remix-run/node";
import { createThemeSessionResolver } from "remix-themes";

import type { User } from "~/types/custom";

type SessionFlashData = {
	error: string;
};

export const { getSession, commitSession, destroySession } =
	createCookieSessionStorage<SessionData, SessionFlashData>({
		cookie: {
			name: "__session",
			secrets: ["super-secret-secret"],
			sameSite: "lax",
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 60 * 60 * 24 * 7, // 7 days
		},
	});

export const getCurrentUser = async (
	request: Request
): Promise<User> => {
	const cookie = request.headers.get("cookie");

	const session = await getSession(cookie);

	const user = session.get("user") as User;

	return user;
};

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
