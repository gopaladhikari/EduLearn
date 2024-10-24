import { Link } from "@remix-run/react";

export function Footer() {
	return (
		<footer>
			<nav>
				<menu>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/about">About</Link>
					</li>
				</menu>
			</nav>
		</footer>
	);
}
