import "axios";

declare module "axios" {
	export interface CustomizedApiResponse<T = any> {
		data: {
			data: T;
			success: boolean;
			message: string;
		};
	}

	export interface CustomizedErrorResponse {
		response: {
			data: {
				data: null;
				success: boolean;
				message: string;
			};
		};
	}

	export interface Axios {
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
