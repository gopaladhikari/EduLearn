import { MaxWidthWrapper } from "./MaxWidthWrapper";
import { ModeToggle } from "./mode-toggle";

export function Header() {
  return (
    <MaxWidthWrapper as="header">
      <ModeToggle />
    </MaxWidthWrapper>
  );
}
