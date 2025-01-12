import { getAllCourses } from "@/lib/tanstack/courses";
import type { MetaFunction } from "@remix-run/node";
import { useQuery } from "@tanstack/react-query";

export const meta: MetaFunction = () => {
  return [
    { title: "E Learning" },
    { name: "description", content: "Welcome to E learning!" },
  ];
};

export default function Index() {
  const { data } = useQuery({
    queryKey: ["courses"],
    queryFn: getAllCourses,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <section>
      <h1>Welcome to Remix!</h1>
    </section>
  );
}
