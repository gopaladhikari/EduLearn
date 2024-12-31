import axios from "axios";
import { env } from "./env";

export const axiosInstance = axios.create({
  baseURL: env.backendApi,
  timeout: 3000, // 3 seconds
  timeoutErrorMessage: "Request timeout",
  withCredentials: true,
});
