import { FC } from "react"
import { IProduct } from "../interfaces/product.interface"
import { getImageUrl } from "../utils/general"

interface IProductItem {
    product: IProduct;
    showAction?: boolean;
    onEdit?: (id: number) => void;
    onDelete?: (id: number) => void;
}

const ProductItem: FC<IProductItem> = ({ product, onDelete, onEdit, showAction = false }) => {

    const handleEdit = () => {
        if (showAction) onEdit?.(product.id);
    }

    const handleDelete = () => {
        if (showAction) onDelete?.(product.id)
    }

    return (
        <div>
            <div className="card" style={{ width: '18rem', minHeight: '350px' }}>
                <img src={getImageUrl(product?.image_url)} className="card-img-top" alt={product.title} />
                <div className="card-body">
                    <h5 className="card-title">{product?.title}</h5>
                    <p className="card-text text-truncate">{product?.description}</p>
                    {
                        showAction && (
                            <div className=" d-flex justify-content-start">
                                <button className="btn btn-danger me-2" onClick={handleDelete}>
                                    <i className="bi bi-trash"></i>
                                </button>
                                <button className="btn btn-info" onClick={handleEdit}>
                                    <i className="bi bi-pencil-square"></i>
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductItem
