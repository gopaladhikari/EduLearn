import axios, { AxiosError } from "axios";
import { env } from "./env";

const axiosInstance = axios.create({
  baseURL: env.backendApi,
  withCredentials: true,
  timeout: 4000, // 4 seconds
  timeoutErrorMessage: "Request timed out",
  headers: {
    "x-api-key": env.xApiKey,
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (import.meta.env.DEV) console.log("error", error);
    if (error instanceof AxiosError)
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
    throw new Error(error.message);
  },
);

export { axiosInstance };
