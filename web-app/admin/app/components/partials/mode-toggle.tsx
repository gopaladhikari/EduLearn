import { Check, Moon, Sun } from "lucide-react";
import { Theme, useTheme } from "remix-themes";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

export function ModeToggle() {
	const [theme, setTheme] = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme(Theme.LIGHT)}>
					Light
					{theme === Theme.LIGHT && (
						<>
							<span className="sr-only">Selected</span>
							<Check />
						</>
					)}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme(Theme.DARK)}>
					Dark
					{theme === Theme.DARK && (
						<>
							<span className="sr-only">Selected</span>
							<Check />
						</>
					)}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
