import { useState } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

interface UseAxiosCoreProps {
    method: 'GET' | 'POST' | 'DELETE' | 'PUT';
    options?: AxiosRequestConfig;
}

interface UseAxiosCoreReturn<T> {
    isLoading: boolean;
    isError: boolean;
    error: AxiosError | null;
    execute: (url?: string, body?: any) => Promise<AxiosResponse<T> | void>;
}

const useAxiosCore = <T = unknown>({ method, options }: UseAxiosCoreProps): UseAxiosCoreReturn<T> => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [error, setError] = useState<AxiosError | null>(null);

    const execute = async (url?: string, body?: any): Promise<AxiosResponse<T, any> | undefined> => {
        setIsLoading(true);
        setIsError(false);
        setError(null);

        try {
            const config: AxiosRequestConfig = {
                ...options,
                method,
                url,
                data: body,
                baseURL: import.meta.env.VITE_NODE_API_BASE_URL
            };

            const token = localStorage.getItem('token');
            if (token) {
                config.headers = {
                    Authorization: `jwt ${token}`
                }
            }

            const response: AxiosResponse<T> = await axios(config);
            return response;
        } catch (err) {
            setIsError(true);
            setError(err as AxiosError);
        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading, isError, error, execute };
};

export const useAxiosGet = <T = unknown>(options?: AxiosRequestConfig) => {
    return useAxiosCore<T>({ method: 'GET', options });
};

export const useAxiosPost = <T = unknown>(options?: AxiosRequestConfig) => {
    return useAxiosCore<T>({ method: 'POST', options });
};

export const useAxiosDelete = <T = unknown>(options?: AxiosRequestConfig) => {
    return useAxiosCore<T>({ method: 'DELETE', options });
};

export default useAxiosCore;
