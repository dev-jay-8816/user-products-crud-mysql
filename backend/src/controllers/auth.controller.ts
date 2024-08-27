import { Request, Response, NextFunction } from "express"
import User from "@/models/user.model"
import { HttpException } from "@/exceptions/HttpException";
import { catchAsync } from "@/utils/catchAsyc";
import generalResponse from "@/utils/generalResponse";
import { JWT_SECRET } from "@/config";
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { parse } from "@/utils/common";

export default class AuthController {

    public registerUser = catchAsync(async (
        req: Request,
        res: Response,
    ) => {
        const {
            email,
            first_name = null,
            last_name = null,
            password = null
        } = req.body;
        const searchUser = await User.findOne({
            where: { deletedAt: null, email },
            attributes: ['id', 'email'],
        });

        if (searchUser) {
            throw new HttpException(400, 'User already existed.', null, true);
        }

        const newUser = await User.create({
            first_name,
            last_name,
            email,
            password,
        });

        return generalResponse(req, res, newUser, 'User registered successfully!', 'success');
    })

    public loginUser = catchAsync(async (
        req: Request,
        res: Response,
    ) => {
        const {email, password} = req.body;

        let user = await User.findOne({
			where: { email },
			attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']},
		});

        if (user) {
            const isMatch = await bcrypt.compare(password, user?.password);
            if (!isMatch) {
                return generalResponse(req, res, null, 'Invalid Password', 'error', true, 403)
            }

            user = parse(user);
            return generalResponse(
                req,
                res,
                {
                    user: {
                        id: user.id,
                        email: user.email,
                        first_name: user.first_name,
                        last_name: user.last_name
                    },
                    access_token: this.createToken(user),
                },
                'Login Successfully!'
            );
        }

    })

    readonly createToken = (user: User) => {
		return jwt.sign({ email: user?.email, id: user.id }, JWT_SECRET, { expiresIn: '7d' });
	};
}