import { JWT_SECRET } from "@/config";
import User from "@/models/user.model";
import generalResponse from "@/utils/generalResponse";
import { Response, Request } from "express";
import { NextFunction } from "express-serve-static-core";
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return generalResponse(req, res, null, 'Token not found.', 'error', true, 403)
    }

    jwt.verify(token, JWT_SECRET, (err, user: User) => {
        if (err) {
            return next(err);
        }
        req.user = user;
        next();
    });
};

export default authMiddleware