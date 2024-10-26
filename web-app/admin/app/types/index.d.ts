import "axios";
import type { AxiosError } from "axios";

declare module "axios" {
	export interface CustomizedApiResponse<T = any> {
		data: {
			data: T;
			success: boolean;
			message: string;
		};
	}

	export interface AxiosInstance {
		get<T = any, R = CustomizedApiResponse<T>, D = any>(
			url: string,
			config?: AxiosRequestConfig<D>
		): Promise<R>;

		post<T = any, R = CustomizedApiResponse<T>, D = any>(
			url: string,
			data?: D,
			config?: AxiosRequestConfig<D>
		): Promise<R>;
	}
}

export interface CustomizedApiError extends AxiosError {
	response?: {
		data: {
			data: null;
			success: boolean;
			message: string;
		};
	};
}
