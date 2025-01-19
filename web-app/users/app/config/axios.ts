import axios, { AxiosError } from "axios";
import { env } from "./env";

const axiosInstance = axios.create({
  baseURL: env.backendApi,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("error", error);
    if (error instanceof AxiosError)
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
    throw new Error(error.message);
  },
);

export { axiosInstance };
