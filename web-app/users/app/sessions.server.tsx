import { createCookie } from "react-router";

export const themeCookie = createCookie("theme", {
  path: "/",
  httpOnly: true,
  sameSite: "lax",
  secrets: ["secret"],
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 30, // 30 days
});
