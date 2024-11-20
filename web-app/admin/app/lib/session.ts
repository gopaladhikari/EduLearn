import {
	createCookieSessionStorage,
	redirect,
} from "@remix-run/node";
import type { User } from "~/types/custom";

type SessionData = {
	user?: User;
	jwtToken?: string;
};

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

export const getCurrentUser = async (request: Request) => {
	const cookie = request.headers.get("cookie");

	const session = await getSession(cookie);

	const user = session.get("user");

	return user;
};
