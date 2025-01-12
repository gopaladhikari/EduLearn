import type { MetaFunction } from "@remix-run/node";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/partials/mode-toggle";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div>
      <h1>Hello world</h1>
      <ModeToggle />
      <Button>Click me</Button>
    </div>
  );
}
