import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class HTTPClient {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    public async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error)
        }
    }

    public async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error)
        }
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config);
            return response.data
        } catch (error) {
            throw this.handleError(error)
        }
    }

    private handleError(error: any): Error {
        if (axios.isAxiosError(error)) {
            return new Error(`API Request failed with status ${error.response?.status || 'unkown'}: ${error.message}`);
        } else {
            return new Error(`Unexpected error: ${error.message}`);
        }
    }
}
