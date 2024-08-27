import { useEffect, useState } from 'react'
import { IProduct } from '../../interfaces/product.interface';
import ProductItem from '../../components/ProductItem';
import { useDeleteProductAPI, useGetLoggedUserProductsAPI } from '../../services/product.services';
import { ProductForm } from '../../components/ProductForm';
import { Modal } from '../../components/Modal';

interface IOpenModal {
  open: boolean;
  id: number | null;
}

const UserProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [openModal, setOpenModal] = useState<IOpenModal>({ open: false, id: null });
  const [deleteModal, setDeleteModal] = useState<number | null>(null);
  
  const { isLoading, getLoggedInUserProductsAPI } = useGetLoggedUserProductsAPI();
  const {deleteProductAPI} = useDeleteProductAPI()

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    const res = await getLoggedInUserProductsAPI();

    if (res?.response_type === 'success') {
      setProducts(res?.responseData?.products)
    }
  }

  const handleEditProduct = (id: number) => {
    setOpenModal({ open: true, id: id })
  }

  const openDeleteModal = (id: number) => {
    setDeleteModal(id)
  }

  const handleCloseModal = () => {
    setOpenModal({
      id: null,
      open: false
    })
  }

  const handleDeleteProduct = async () => {
    if (!deleteModal) {
      return;
    }

    const res = await deleteProductAPI(deleteModal);

    if (res?.response_type === 'success') {
      setDeleteModal(null);
      fetchProducts()
    }
  }

  return (
    <div>
      {!isLoading ? (
        <>
          <div className="d-flex mb-4 justify-content-end">
            <button className="btn btn-primary" type='button' onClick={() => setOpenModal({ open: true, id: null })}>
              Add Product
            </button>
          </div>
          <div className="d-flex flex-row gap-2">
            {products.map(el => {
              return (
                <ProductItem
                  key={el.id}
                  product={el}
                  showAction
                  onDelete={openDeleteModal}
                  onEdit={handleEditProduct}
                />
              )
            })}
          </div>
          <Modal
            title={(openModal?.id ? 'Edit' : 'Add') + ' Product'}
            isOpen={openModal.open}
            onClose={handleCloseModal}
          >
            <ProductForm
              onClose={handleCloseModal}
              id={openModal.id}
              refreshProducts={fetchProducts}
            />
          </Modal>
          <Modal
            title='Delete Product'
            isOpen={!!deleteModal}
            onClose={() => setDeleteModal(null)}
          >
            <>
              <p>Are you sure?</p>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setDeleteModal(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary" onClick={handleDeleteProduct}>Yes</button>
              </div>
            </>
          </Modal>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default UserProducts
