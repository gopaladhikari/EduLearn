import axios from "axios";
import { env } from "./env";
import { getCurrentUser, getSession } from "~/lib/session";

const axiosInstance = axios.create({
	baseURL: env.backendApi.concat("/api/v1/admin"),
	timeout: 5000,
	withCredentials: true,
	timeoutErrorMessage: "Request timeout",
});

axiosInstance.interceptors.request.use(
	async (config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export { axiosInstance };
