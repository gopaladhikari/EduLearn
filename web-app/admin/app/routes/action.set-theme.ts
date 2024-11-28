import { createThemeAction } from "remix-themes";
import { themeSessionResolver } from "~/lib/session";

export const action = createThemeAction(themeSessionResolver);
