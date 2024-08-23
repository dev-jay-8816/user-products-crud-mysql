import { AxiosResponse } from "axios";
import { useAxiosPost } from "../hooks/useAxios";

const BASE_PATH = '/auth';

export const useRegisterAPI = () => {
    const { isLoading, execute } = useAxiosPost()

    const registerAPI = async (data: object) => {
        const response = await execute(`${BASE_PATH}/register`, data)
        return response?.data as AxiosResponse['data']
    }

    return {
        registerAPI,
        isLoading
    }
}

export const useLoginAPI = () => {
    const { isLoading, execute } = useAxiosPost()

    const loginAPI = async (data: object) => {
        const response = await execute(`${BASE_PATH}/login`, data)
        return response?.data as AxiosResponse['data']
    }

    return {
        loginAPI,
        isLoading
    }
}