import { Formik, Form, Field, ErrorMessage } from "formik";
import { createEditProductValidation } from "../schemas/product.schema";
import { FC, useEffect, useState } from "react";
import { productInitValues } from "../schemas/product.schema";
import { ICreateEditProduct } from "../interfaces/product.interface";
import DatePicker from "react-datepicker";
import { useCreateProductAPI, useGetProductAPI, useUpdateProductAPI } from "../services/product.services";
import { getImageUrl } from "../utils/general";

interface IProductForm {
    id: number | null;
    onClose: () => void;
    submitButtonTitle?: string;
    refreshProducts?: () => Promise<void>;
}

const ProductForm: FC<IProductForm> = ({
    id,
    onClose,
    submitButtonTitle = 'Save',
    refreshProducts
}) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [formValues, setFormValues] = useState<ICreateEditProduct | null>(null)

    const { getProductAPI } = useGetProductAPI();
    const { createProductAPI, isLoading: createProdLoader } = useCreateProductAPI()
    const { updateProductAPI, isLoading: updateProdLoader } = useUpdateProductAPI()


    useEffect(() => {
        if (id) {
            fetchProductById(id);
        }
    }, [])

    async function fetchProductById(id: number) {
        const res = await getProductAPI(id)

        if (res?.response_type === 'success') {
            const product = res?.responseData?.product

            setFormValues({
                title: product?.title,
                description: product?.description,
                published_date: new Date(product?.published_date),
                is_enabled: product?.is_enabled,
                image_url: product?.image_url
            });

            if (product?.image_url) {
                setImagePreview(getImageUrl(product?.image_url));
            }
        }


    }

    const handleSubmit = async (values: ICreateEditProduct) => {
        const formData = new FormData();

        formData.append('title', values?.title)
        formData.append('description', values?.description)
        formData.append('is_enabled', `${values?.is_enabled}`)
        formData.append('published_date', values.published_date.toUTCString())
        if (values?.image_url && typeof values?.image_url !== 'string') {
            formData.append('image_url', values?.image_url)
        }

        if (id) {
            await updateProductAPI(id, formData);
        }
        else {
            await createProductAPI(formData);
        }

        //Close the modal and fetch product
        onClose();
        refreshProducts?.();
    }



    return (
        <>
            <Formik
                initialValues={formValues ?? productInitValues}
                onSubmit={handleSubmit}
                validationSchema={createEditProductValidation}
                enableReinitialize
            >
                {({ setFieldValue, values }) => {
                    return (
                        <Form>
                            <div className="mb-3">
                                {
                                    imagePreview ? (
                                        <div className="img-container">
                                            <img src={imagePreview} alt="Image Preview" className="img-preview" />
                                            <button className="btn-close-custom" onClick={() => {
                                                setFieldValue('image_url', null);
                                                setImagePreview(null)
                                            }} >×</button>
                                        </div>
                                    ) : (
                                        <>
                                            <label className="form-label">Image</label>
                                            <input
                                                name="image_url"
                                                className="form-control"
                                                type="file"
                                                onChange={(e) => {
                                                    const file = e?.target?.files?.[0];
                                                    if (file) {
                                                        setFieldValue('image_url', file)
                                                        setImagePreview(URL.createObjectURL(file))
                                                    }

                                                }}
                                            />
                                            <ErrorMessage name="image_url" component={'div'} className="text-danger" />
                                        </>
                                    )
                                }
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <Field name="title" className="form-control" />
                                <ErrorMessage name="title" component={'div'} className="text-danger" />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <Field name="description" className="form-control" />
                                <ErrorMessage name="description" component={'div'} className="text-danger" />
                            </div>

                            <div className="form-check form-switch mb-3">
                                <Field className="form-check-input" type="checkbox" id='product-enabled-switch' name='is_enabled' />
                                <label className="form-check-label" htmlFor="product-enabled-switch">Enabled</label>
                            </div>

                            <div className="d-flex flex-column mb-3">
                                <label className="form-label">Publish Date</label>
                                <DatePicker name='published_date' selected={values.published_date} onChange={date => setFieldValue('published_date', date)} className='form-control' showTimeSelect dateFormat="MMMM d, yyyy h:mm aa" />
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                                <button type="submit" className="btn btn-primary" disabled={createProdLoader || updateProdLoader} >{submitButtonTitle}</button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>



        </>
    )
}

export { ProductForm }
