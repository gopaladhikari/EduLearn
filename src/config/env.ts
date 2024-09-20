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
  // FIREBASE_API_KEY,
  // FIREBASE_AUTH_DOMAIN,
  // FIREBASE_PROJECT_ID,
  // FIREBASE_STORAGE_BUCKET,
  // FIREBASE_MESSAGING_SENDER_ID,
  // FIREBASE_APP_ID,
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
  dbName: zod.string({
    required_error: "DB_NAME is required",
  }),
  razorpayIdKey: zod.string({
    required_error: "RAZORPAY_ID_KEY is required",
  }),
  razorpaySecretKey: zod.string({
    required_error: "RAZORPAY_SECRET_KEY is required",
  }),
  firebaseApiKey: zod.string({
    required_error: "FIREBASE_API_KEY is required",
  }),
  firebaseAuthDomain: zod.string({
    required_error: "FIREBASE_AUTH_DOMAIN is required",
  }),
  firebaseProjectId: zod.string({
    required_error: "FIREBASE_PROJECT_ID is required",
  }),
  firebaseStorageBucket: zod.string({
    required_error: "FIREBASE_STORAGE_BUCKET is required",
  }),
  firebaseMessagingSenderId: zod.string({
    required_error: "FIREBASE_MESSAGING_SENDER_ID is required",
  }),
  firebaseAppId: zod.string({
    required_error: "FIREBASE_APP_ID is required",
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
  // firebaseApiKey: FIREBASE_API_KEY,
  // firebaseAuthDomain: FIREBASE_AUTH_DOMAIN,
  // firebaseProjectId: FIREBASE_PROJECT_ID,
  // firebaseStorageBucket: FIREBASE_STORAGE_BUCKET,
  // firebaseMessagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  // firebaseAppId: FIREBASE_APP_ID,
});

export const env: Readonly<typeof parsedEnv> = parsedEnv;
