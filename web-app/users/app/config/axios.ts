import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error instanceof AxiosError)
      if (error.response?.data?.message)
        throw new Error(error.response.data.message);
    throw new Error(error.message);
  },
);

export { axiosInstance };
