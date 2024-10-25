import z from "zod";

const { BACKEND_API } = process.env;

const envSchema = z.object({
	backendApi: z.string().url(),
});

const parsedEnv = envSchema.safeParse({
	backendApi: BACKEND_API,
});

if (!parsedEnv.success) throw new Error(parsedEnv.error.message);

export type Env = z.infer<typeof envSchema>;

export const env: Env = parsedEnv.data;
