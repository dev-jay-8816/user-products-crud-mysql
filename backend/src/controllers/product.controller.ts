import { Request, Response, NextFunction } from "express"
import User from "@/models/user.model"
import Product from "@/models/product.model";
import { catchAsync } from "@/utils/catchAsyc";
import generalResponse from "@/utils/generalResponse";

import { parse } from "@/utils/common";
import { Op, where } from "sequelize";
import { HttpException } from "@/exceptions/HttpException";

export default class ProductController {

    public getAllProducts = catchAsync(async (
        req: Request,
        res: Response,
    ) => {
        const todayUTC = new Date(new Date().toISOString().split('T')[0])
        let products = await Product.findAll({
            where: {
                is_enabled: true,
                published_date: {
                    [Op.gte]: todayUTC
                }
            },
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        });
        products = parse(products);
        return generalResponse(req, res, { products }, '', 'success', false, 200)
    })

    public getProductById = catchAsync(async (
        req: Request,
        res: Response
    ) => {
        const id = req.params.id;

        if (!id) {
            throw new HttpException(404, 'Product id required', null, true);
        }

        const product = await Product.findOne({
            where: {
                id
            },
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        });


        return generalResponse(req, res, { product }, 'Product updated successfully!');
    })

    public getLoggedUserProducts = catchAsync(async (
        req: Request,
        res: Response,
    ) => {
        let products = await Product.findAll({
            where: {
                user_id: req.user.id
            },
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        });
        products = parse(products);
        return generalResponse(req, res, { products }, '', 'success', false, 200)
    })

    public createProduct = catchAsync(async (
        req: Request,
        res: Response,
    ) => {
        const { title, description, is_enabled, published_date, image_url = null } = req.body;

        console.log('user: ', req?.user)

        const newProduct = await Product.create({
            title,
            description,
            is_enabled,
            published_date,
            image_url,
            user_id: req.user.id
        });

        return generalResponse(req, res, { product: newProduct }, 'Product added successfully!', 'success', false, 200)
    })

    public updateProductById = catchAsync(async (
        req: Request,
        res: Response
    ) => {
        const id = req.params.id;

        if (!id) {
            throw new HttpException(404, 'Product id required', null, true);
        }

        const product = await Product.findOne({
            where: {
                id
            },
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        });

        if (!product) {
            return generalResponse(req, res, null, 'Product not found.', 'error', true, 400);
        }

        await Product.update({
            ...req.body
        }, {
            where: {
                id
            }
        });

        return generalResponse(req, res, null, 'Product updated successfully!');
    })

    public deleteProductById = catchAsync(async (
        req: Request,
        res: Response
    ) => {
        const id = req.params.id;

        if (!id) {
            throw new HttpException(404, 'Product id required', null, true);
        }

        const product = await Product.findOne({
            where: {
                id
            },
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        });

        if (!product) {
            return generalResponse(req, res, null, 'Product not found.', 'error', true, 400);
        }

        await Product.destroy({
            where: {
                id
            }
        });

        return generalResponse(req, res, null, 'Product deleted successfully!');
    })
}