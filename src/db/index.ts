import mongoose from "mongoose";
import { env } from "../config/env";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.mongoUri, {
      dbName: env.dbName,
    });
    console.log(conn.connection.host);
  } catch (error) {
    throw new Error(`MongoDB connection error: ${error}`);
  }
};
