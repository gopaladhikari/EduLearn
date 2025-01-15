import { site } from "@/config/site";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: site.title },
    { name: "description", content: site.description },
  ];
};

export default function Index() {
  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
}
