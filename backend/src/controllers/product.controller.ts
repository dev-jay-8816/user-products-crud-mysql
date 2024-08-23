import { Request, Response, NextFunction } from "express"
import User from "@/models/user.model"
import Product from "@/models/product.model";
import { catchAsync } from "@/utils/catchAsyc";
import generalResponse from "@/utils/generalResponse";

import { parse } from "@/utils/common";
import { Op } from "sequelize";

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
            // attributes: []
        });
        products = parse(products);
        return generalResponse(req, res, { products }, '', 'success', false, 200)
    })
}