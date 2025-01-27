import { Form } from "@remix-run/react";
import { Moon, Sun } from "lucide-react";

export function ModeToggle({ theme }: { theme: string }) {
  return (
    <Form method="post" className="flex flex-col">
      {theme === "dark" ? (
        <button type="submit" name="theme" value="light">
          <Moon size={16} />
        </button>
      ) : (
        <button type="submit" name="theme" value="dark">
          <Sun size={16} />
        </button>
      )}
    </Form>
  );
}
