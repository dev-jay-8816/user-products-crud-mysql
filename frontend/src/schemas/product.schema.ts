import * as Yup from 'yup'
import { ICreateEditProduct } from '../interfaces/product.interface'


export const createEditProductValidation = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    is_is_enabled: Yup.boolean(),
    published_date: Yup.date().required('Publish date is required.'),
    image_url: Yup.mixed().required('Please upload image')
}).required();


export const productInitValues: ICreateEditProduct = {
    title: '',
    description: '',
    is_enabled: true,
    published_date: new Date(),
    image_url: null
}
