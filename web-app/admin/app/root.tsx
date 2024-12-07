import {
	ThemeProvider,
	useTheme,
	PreventFlashOnWrongTheme,
} from "remix-themes";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	useLoaderData,
} from "@remix-run/react";
import {
	ScrollRestoration,
	type LoaderFunction,
} from "react-router-dom";
import { themeSessionResolver } from "./lib/session";
import type { LinksFunction } from "@remix-run/node";
import tailwind from "./tailwind.css?url";

export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: tailwind }];
};

export const loader: LoaderFunction = async ({ request }) => {
	const { getTheme } = await themeSessionResolver(request);
	return {
		theme: getTheme(),
	};
};

export default function AppWithProviders() {
	const data = useLoaderData<typeof loader>();
	return (
		<ThemeProvider
			specifiedTheme={data.theme}
			themeAction="/action/set-theme"
		>
			<App />
		</ThemeProvider>
	);
}

function App() {
	const [theme] = useTheme();

	return (
		<html lang="en" className={theme ?? "dark"}>
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1"
				/>
				<Meta />
				<PreventFlashOnWrongTheme ssrTheme={Boolean(theme)} />
				<Links />
			</head>
			<body>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}
