import axios, { AxiosError } from "axios";
import { env } from "./env";

const axiosInstance = axios.create({
  baseURL: env.backendApi,
  withCredentials: true,
  // timeout: 20000, // 20 seconds
  // timeoutErrorMessage: "Request timed out",
  headers: {
    "x-api-key": env.xApiKey,
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
