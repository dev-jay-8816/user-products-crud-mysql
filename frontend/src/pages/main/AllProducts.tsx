import React, { useEffect, useState } from 'react'
import { useGetAllProductAPI } from '../../services/product.services'

interface IProduct {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  is_enabled?: boolean;
  published_date: Date | string;
  user_id: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}

const AllProducts = () => {
  const { getAllProductAPI, isLoading } = useGetAllProductAPI()

  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    const res = await getAllProductAPI();

    if (res?.response_type === 'success') {
      setProducts(res?.responseData?.products)
    }
  }

  return (
    <div>
      {!isLoading ? (
        <>
          {products.map(el => {
            return (
              <p>{el?.title}</p>
            )
          })}
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default AllProducts
