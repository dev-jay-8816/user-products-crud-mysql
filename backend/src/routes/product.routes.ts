import { Routes } from "@/interfaces/routes.interface";
import { Router } from "express";
import ProductController from "@/controllers/product.controller";
import authMiddleware from "@/middlewares/auth.middleware";
import validationMiddleware from "@/middlewares/validation.middleware";
import { createProductSchema, productIdParamSchema, updateProductSchema } from "@/validations-schema/product.validation";
import { multerInterceptorConfig } from "@/middlewares/multer.middleware";


export default class ProductRoutes implements Routes {
    public path = '/products';
    public router = Router();
    private productController = new ProductController();

    constructor() {
        this.initializeRoute();
    }

    private initializeRoute() {
        this.router.get(
            `${this.path}/all`,
            authMiddleware,
            this.productController.getAllProducts
        );

        this.router.get(
            `${this.path}/logged-in-user`,
            authMiddleware,
            this.productController.getLoggedUserProducts
        )

        this.router.get(
            `${this.path}/get/:id`,
            authMiddleware,
            validationMiddleware(productIdParamSchema, 'params'),
            this.productController.getProductById
        )

        this.router.post(
            `${this.path}/create`,
            authMiddleware,
            multerInterceptorConfig().single('image_url'),
            validationMiddleware(createProductSchema, 'body'),
            this.productController.createProduct
        );

        this.router.post(
            `${this.path}/update/:id`,
            authMiddleware,
            multerInterceptorConfig().single('image_url'),
            validationMiddleware(productIdParamSchema, 'params'),
            validationMiddleware(updateProductSchema, 'body'),
            this.productController.updateProductById
        )

        this.router.delete(
            `${this.path}/delete/:id`,
            authMiddleware,
            validationMiddleware(productIdParamSchema, 'params'),
            this.productController.deleteProductById
        )
    }
}