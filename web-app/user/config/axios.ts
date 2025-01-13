import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("response", response.data);
    return response;
  },
  (error) => {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || error.message;
      if (message) throw new Error(message);
    }
    throw error;
  }
);

export { axiosInstance };
