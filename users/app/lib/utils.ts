import type { User } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { createCookieSessionStorage } from "react-router";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
type SessionData = {
  user: User;
};

type SessionFlashData = {
  error: string;
};

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "__session",
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      secrets: ["s3cret1"],
      secure: true,
    },
  });
