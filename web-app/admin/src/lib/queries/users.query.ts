import type { User } from "@/types";

export const me = async (): Promise<User> => {
  const res = await fetch("/api/users/me");

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};
