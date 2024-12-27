type Data = {
  email: string;
  password: string;
};

export const registerMutation = async (formData: Data) => {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...formData,
      role: "admin",
    }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

export const verifyEmailMutation = async (
  email: string,
  token: string
) => {
  const res = await fetch(`/api/auth/verify-email/${token}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};
