import mongoose from "mongoose";
import { env } from "../config/env";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `${env.mongoUri}/sample_mflix`
    );
    console.log(conn.connection.host);
  } catch (error) {
    throw new Error(`MongoDB connection error: ${error}`);
  }
};
