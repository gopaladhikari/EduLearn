import type { CustomResponse, User } from "@/types";

export const me = async (): CustomResponse<User> => {
  const res = await fetch("/api/users/me");

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};
