import axios, { AxiosError } from "axios";
import { env } from "./env";

const axiosInstance = axios.create({
  baseURL: env.backendApi,
  timeout: 4000, // 4 seconds
  timeoutErrorMessage: "Request timed out",

  headers: {
    "x-api-key": env.xApiKey,
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error instanceof AxiosError)
      if (error.response?.data?.message) {
        console.log("error", error.response?.data);
        throw new Error(error.response.data.message);
      }
    throw new Error(error.message);
  },
);

export { axiosInstance };
