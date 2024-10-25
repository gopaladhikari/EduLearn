import { AxiosResponse as OriginalAxiosResponse } from "axios";

declare module "axios" {
	interface AxiosResponse<T = any> extends OriginalAxiosResponse<T> {
		data: {
			success: boolean;
			data: T | null;
			message: string;
		};
	}
}
