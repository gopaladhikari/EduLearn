import type { ConfirmPasswordSchema } from "@/schemas/confirm-password.schema";

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

export const verifyEmailMutation = async (email: string, token: string) => {
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

export const loginMutation = async (formData: Data) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

export const requestForgotPassword = async (email: string) => {
  const res = await fetch(`/api/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

export const confirmForgotPassword = async (
  formData: ConfirmPasswordSchema,
  token: string,
) => {
  const res = await fetch(`/api/auth/forgot-password/${token}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};

export const resetPasswordMutation = async (formData: Data) => {
  const res = await fetch(`/api/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};
