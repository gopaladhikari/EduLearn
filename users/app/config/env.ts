import { z } from "zod";

const { VITE_BACKEND_API, VITE_X_API_KEY } = import.meta.env;

const envSchema = z.object({
  backendApi: z.string().url(),
  xApiKey: z.string(),
});

export const env = envSchema.parse({
  backendApi: VITE_BACKEND_API,
  xApiKey: VITE_X_API_KEY,
});
