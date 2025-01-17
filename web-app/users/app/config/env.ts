import { z } from "zod";

const { VITE_BACKEND_API } = import.meta.env;

const envSchema = z.object({
  backendApi: z.string().url(),
});

export const env = envSchema.parse({
  backendApi: VITE_BACKEND_API,
});
