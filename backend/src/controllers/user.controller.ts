import { Request, Response, NextFunction } from "express"
import User from "@/models/user.model"
import generalResponse from "@/utils/generalResponse";
import { catchAsync } from "@/utils/catchAsyc";

export default class UserController {

    public getLoggedUserProducts = catchAsync(async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const users = await User.findAll();
        generalResponse(req, res, users, '', 'success')
    });
}