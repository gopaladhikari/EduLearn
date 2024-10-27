import {
	json,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { Header } from "./components/partials/Header";
import { Footer } from "./components/partials/Footer";
import styles from "./tailwind.css?url";
import { getCurrentUser } from "./lib/session";

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: styles },
];

// export const loader: LoaderFunction = async ({ request }) => {};

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<Meta />
				<Links />
			</head>
			<body suppressHydrationWarning>
				<Header />
				<main>{children}</main>
				<Footer />
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
