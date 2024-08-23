import { AxiosResponse } from "axios";
import { useAxiosPost, useAxiosGet } from "../hooks/useAxios";

const BASE_PATH = '/products';

export const useGetAllProductAPI = () => {
    const { isLoading, execute } = useAxiosGet()

    const getAllProductAPI = async () => {
        const response = await execute(`${BASE_PATH}/all`)
        return response?.data as AxiosResponse['data']
    }

    return {
        getAllProductAPI,
        isLoading
    }
}