import zod from "zod";

const {
  MONGO_URI,
  JWT_SECRET,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
} = process.env;

const envSchema = zod.object({
  mongoUri: zod.string({
    required_error: "MONGO_URI is required",
  }),
  jwtSecret: zod.string({
    required_error: "JWT_SECRET is required",
  }),
  twilioSid: zod.string({
    required_error: "TWILIO_ACCOUNT_SID is required",
  }),
  twilioAuthToken: zod.string({
    required_error: "TWILIO_AUTH_TOKEN is required",
  }),
  twilioPhoneNumber: zod.string({
    required_error: "TWILIO_PHONE_NUMBER is required",
  }),
});

const parsedEnv = envSchema.parse({
  mongoUri: MONGO_URI,
  jwtSecret: JWT_SECRET,
  twilioSid: TWILIO_ACCOUNT_SID,
  twilioAuthToken: TWILIO_AUTH_TOKEN,
  twilioPhoneNumber: TWILIO_PHONE_NUMBER,
});

export const env: Readonly<typeof parsedEnv> = parsedEnv;
