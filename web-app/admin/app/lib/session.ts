import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
	user: {
		_id: string;
		email: string;
		fullName: string;
	};
};

type SessionFlashData = {
	error: string;
};

export const { getSession, commitSession, destroySession } =
	createCookieSessionStorage<SessionData, SessionFlashData>({
		cookie: {
			name: "__session",
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 7, // 7 days
			secure: true,
		},
	});
