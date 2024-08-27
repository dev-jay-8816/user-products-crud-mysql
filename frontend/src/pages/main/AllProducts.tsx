import { useEffect, useState } from 'react'
import { useGetAllProductAPI } from '../../services/product.services'
import { IProduct } from '../../interfaces/product.interface';
import ProductItem from '../../components/ProductItem';

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
        <div className="d-flex flex-row gap-2">
          {products.map(el => {
            return (
              <ProductItem key={el.id} product={el} />
            )
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default AllProducts
