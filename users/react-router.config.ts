import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  prerender: [
    "/",
    "/login",
    "/register",
    "/terms-and-conditions",
    "/privacy-policy",
    "/cart",
    "/forgot-password",
    "not-found",
  ],
} satisfies Config;
