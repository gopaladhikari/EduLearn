# Config

This folder contains the configuration files for the application.

1. [env.ts](#envts)
2. [node-cache.ts](#node-cachets)

## env.ts

This file contains the environment variables validation for the application using zod.

**Example**

```ts
import z from "zod";

const {
  MONGO_URI,
  // other variables
} = process.env;

const envSchema = z.object({
  mongoUri: zod.string().min(1, {
    message: "MONGO_URI is required",
  }),
});

const parsedEnv = envSchema.parse({
  mongoUri: MONGO_URI,
  // other variables
});

type Env = Readonly<typeof parsedEnv>;

export const env: Env = parsedEnv;
```

## node-cache.ts

This file contains the configuration for the `node-cache` library.

**Example**

```ts
import NodeCache from "node-cache";

const cache = new NodeCache({
  stdTTL: 60 * 60 * 3, // 3 hours
  checkperiod: 60 * 60 * 1, // 1 hour
});

export { cache };
```
