import { Routes } from "@/interfaces/routes.interface";
import { Router } from "express";
import ProductController from "@/controllers/product.controller";
import authMiddleware from "@/middlewares/auth.middleware";


export default class ProductRoutes implements Routes {
    public path = '/products';
    public router = Router();
    private productController = new ProductController();

    constructor(){
        //TODO Validation Schema: Joi
        this.initializeRoute();
    }

    private initializeRoute () {
        this.router.get(
            `${this.path}/all`,
            authMiddleware,
            this.productController.getAllProducts
        );
    }
}