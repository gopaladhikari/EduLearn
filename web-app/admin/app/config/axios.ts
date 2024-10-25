import axios from "axios";
import { env } from "./env";

const axiosInstance = axios.create({
	baseURL: env.backendApi.concat("/api/v1/admin"),
	timeout: 5000,
	timeoutErrorMessage: "Request timeout",
});

export { axiosInstance };
