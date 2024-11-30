import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Form, json } from "@remix-run/react";
import { Plus, PlusCircle, Search } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { axiosInstance } from "~/config/axios";

export const meta: MetaFunction = () => {
	return [
		{ title: "Products | E learning" },
		{ name: "description", content: "Products list of E-learning" },
	];
};

const courses = [
	{
		_id: 1,
		image: "image",
		title: "This is title",
		description: "This is desc",
	},
	{
		_id: 1,
		image: "image",
		title: "This is title",
		description: "This is desc",
	},
	{
		_id: 1,
		image: "image",
		title: "This is title",
		description: "This is desc",
	},
	{
		_id: 1,
		image: "image",
		title: "This is title",
		description: "This is desc",
	},
	{
		_id: 1,
		image: "image",
		title: "This is title",
		description: "This is desc",
	},
	{
		_id: 1,
		image: "image",
		title: "This is title",
		description: "This is desc",
	},
	{
		_id: 1,
		image: "image",
		title: "This is title",
		description: "This is desc",
	},
	{
		_id: 1,
		image: "image",
		title: "This is title",
		description: "This is desc",
	},
	{
		_id: 1,
		image: "image",
		title: "This is title",
		description: "This is desc",
	},
];

export default function route() {
	return (
		<main>
			<h1 className="text-xl">Courses Lists</h1>
			<section>
				<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
					<Form
						action=""
						className="mt-4 flex items-center gap-4 rounded-sm border-2 px-4 py-2 focus-within:border-primary"
					>
						<Search size={18} />
						<input
							type="text"
							name="Search"
							placeholder="Search..."
							className="bg-transparent placeholder:text-sm focus:outline-none group-active:border-primary"
						/>
					</Form>

					<Button>
						<PlusCircle size={20} />
						Add Course
					</Button>
				</div>
			</section>

			<section className="mt-8">
				<table>
					<thead>
						<td className="font-bold">Name</td>
						<td className="font-bold">Description</td>
						<td className="font-bold">Price</td>
					</thead>

					<tbody>
						{courses.map((course) => (
							<tr key={course._id}>
								<td>{course.title}</td>
								<td>{course.description}</td>
								<td>500</td>
							</tr>
						))}
					</tbody>

					<tfoot></tfoot>
				</table>
			</section>
		</main>
	);
}
