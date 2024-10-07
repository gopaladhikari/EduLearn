import zod from "zod";

const {
  MONGO_URI,
  JWT_SECRET,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
  DB_NAME,
  RAZORPAY_ID_KEY,
  RAZORPAY_SECRET_KEY,
} = process.env;

const envSchema = zod.object({
  mongoUri: zod.string().min(1, {
    message: "MONGO_URI is required",
  }),
  jwtSecret: zod.string().min(1, {
    message: "JWT_SECRET is required",
  }),
  twilioSid: zod.string().min(1, {
    message: "TWILIO_ACCOUNT_SID is required",
  }),
  twilioAuthToken: zod.string().min(1, {
    message: "TWILIO_AUTH_TOKEN is required",
  }),
  twilioPhoneNumber: zod.string().min(1, {
    message: "TWILIO_PHONE_NUMBER is required",
  }),
  dbName: zod.string().min(1, {
    message: "DB_NAME is required",
  }),
  razorpayIdKey: zod.string().min(1, {
    message: "RAZORPAY_ID_KEY is required",
  }),
  razorpaySecretKey: zod.string().min(1, {
    message: "RAZORPAY_SECRET_KEY is required",
  }),
});

const parsedEnv = envSchema.parse({
  mongoUri: MONGO_URI,
  jwtSecret: JWT_SECRET,
  twilioSid: TWILIO_ACCOUNT_SID,
  twilioAuthToken: TWILIO_AUTH_TOKEN,
  twilioPhoneNumber: TWILIO_PHONE_NUMBER,
  dbName: DB_NAME,
  razorpayIdKey: RAZORPAY_ID_KEY,
  razorpaySecretKey: RAZORPAY_SECRET_KEY,
});

export const env: Readonly<typeof parsedEnv> = parsedEnv;
