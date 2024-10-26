import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
	userId: string;
};

type SessionFlashData = {
	error: string;
};

export const { getSession, commitSession, destroySession } =
	createCookieSessionStorage<SessionData, SessionFlashData>({
		cookie: {
			name: "__session",
			domain: "remix.run",
			httpOnly: true,
			maxAge: 60,
			path: "/",
			sameSite: "lax",
			secrets: ["s3cret1"],
			secure: true,
		},
	});
