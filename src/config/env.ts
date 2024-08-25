import zod from "zod";

const {
  MONGO_URI,
  JWT_SECRET,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
  TYPE,
  PROJECT_ID,
  PRIVATE_KEY_ID,
  PRIVATE_KEY,
  CLIENT_EMAIL,
  CLIENT_ID,
  AUTH_URI,
  TOKEN_URI,
  AUTH_PROVIDER_X509_CERT_URL,
  CLIENT_X509_CERT_URL,
  UNIVERSE_DOMAIN,
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
  type: zod.string({
    required_error: "Firebase TYPE is required",
  }),
  projectId: zod.string({
    required_error: "Firebase PROJECT_ID is required",
  }),
  privateKeyId: zod.string({
    required_error: "Firebase PRIVATE_KEY_ID is required",
  }),
  privateKey: zod.string({
    required_error: "Firebase PRIVATE_KEY is required",
  }),
  clientEmail: zod.string({
    required_error: "Firebase CLIENT_EMAIL is required",
  }),
  clientId: zod.string({
    required_error: "Firebase CLIENT_ID is required",
  }),
  authUri: zod.string({
    required_error: "Firebase AUTH_URI is required",
  }),
  tokenUri: zod.string({
    required_error: "Firebase TOKEN_URI is required",
  }),
  authProviderX509CertUrl: zod.string({
    required_error:
      "Firebase AUTH_PROVIDER_X509_CERT_URL is required",
  }),
  clientX509CertUrl: zod.string({
    required_error: "Firebase CLIENT_X509_CERT_URL is required",
  }),
  universeDomain: zod.string({
    required_error: "Firebase UNIVERSE_DOMAIN is required",
  }),
});

const parsedEnv = envSchema.parse({
  mongoUri: MONGO_URI,
  jwtSecret: JWT_SECRET,
  twilioSid: TWILIO_ACCOUNT_SID,
  twilioAuthToken: TWILIO_AUTH_TOKEN,
  twilioPhoneNumber: TWILIO_PHONE_NUMBER,
  type: TYPE,
  projectId: PROJECT_ID,
  privateKeyId: PRIVATE_KEY_ID,
  privateKey: PRIVATE_KEY,
  clientEmail: CLIENT_EMAIL,
  clientId: CLIENT_ID,
  authUri: AUTH_URI,
  tokenUri: TOKEN_URI,
  authProviderX509CertUrl: AUTH_PROVIDER_X509_CERT_URL,
  clientX509CertUrl: CLIENT_X509_CERT_URL,
  universeDomain: UNIVERSE_DOMAIN,
});

export const env: Readonly<typeof parsedEnv> = parsedEnv;
