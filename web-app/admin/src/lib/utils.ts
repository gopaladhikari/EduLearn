import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const throwError = (error: unknown) => {
  if (error instanceof AxiosError)
    if (error.response?.data?.message)
      throw new Error(error.response.data.message);

  throw new Error((error as Error).message);
};
