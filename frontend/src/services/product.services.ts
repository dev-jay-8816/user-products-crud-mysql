import { AxiosResponse } from "axios";
import { useAxiosPost, useAxiosGet, useAxiosDelete } from "../hooks/useAxios";

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

export const useGetLoggedUserProductsAPI = () => {
    const { isLoading, execute } = useAxiosGet();

    const getLoggedInUserProductsAPI = async () => {
        const response = await execute(`${BASE_PATH}/logged-in-user`)
        return response?.data as AxiosResponse['data']
    }

    return {
        getLoggedInUserProductsAPI,
        isLoading
    }
}

export const useGetProductAPI = () => {
    const { isLoading, execute } = useAxiosGet();

    const getProductAPI = async (id: number) => {
        const response = await execute(`${BASE_PATH}/get/${id}`);
        return response?.data as AxiosResponse['data']
    }

    return {
        getProductAPI,
        isLoading
    }
}

export const useCreateProductAPI = () => {
    const { isLoading, execute } = useAxiosPost();

    const createProductAPI = async (data: object) => {
        const response = await execute(`${BASE_PATH}/create`, data);
        return response?.data as AxiosResponse['data']
    }

    return {
        createProductAPI,
        isLoading
    }
}

export const useUpdateProductAPI = () => {
    const { isLoading, execute } = useAxiosPost();

    const updateProductAPI = async (id: number, data: object) => {
        const response = await execute(`${BASE_PATH}/update/${id}`, data);
        return response?.data as AxiosResponse['data']
    }

    return {
        updateProductAPI,
        isLoading
    }
}

export const useDeleteProductAPI = () => {
    const { isLoading, execute } = useAxiosDelete();

    const deleteProductAPI = async (id: number) => {
        const response = await execute(`${BASE_PATH}/delete/${id}`);
        return response?.data as AxiosResponse['data']
    }

    return {
        deleteProductAPI,
        isLoading
    }
}