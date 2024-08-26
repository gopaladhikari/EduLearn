import twilio from "twilio";
import { env } from "../config/env";

const twilioClient = twilio(env.twilioSid, env.twilioAuthToken);

export const sendOtp = async (mobileno: string, message: string) => {
  const response = await twilioClient.messages.create({
    body: message,
    from: env.twilioPhoneNumber,
    to: mobileno,
  });

  return response;
};
