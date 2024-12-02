import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
	return [
		{ title: "Settings | E learning" },
		{ name: "description", content: "Settings of E-learning" },
		{ property: "og:title", content: "Settings" },
	];
};

export default function () {
	return (
		<>
			<section>
				<h2>Avatar</h2>
			</section>

			<section>
				<h3>Display name</h3>
			</section>

			<section>
				<h2>Username</h2>
			</section>

			<section>
				<h2>Email</h2>
			</section>

			<section>
				<h2>Your Phone Number</h2>
			</section>

			<section>
				<h2>E-Learning ID</h2>
			</section>

			<section>
				<h2>Delete Account</h2>
			</section>
		</>
	);
}
