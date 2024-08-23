import { NextFunction, Request, Response } from 'express';
import generalResponse from '@utils/generalResponse';
import { HttpException } from '@exceptions/HttpException';

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    try {
        if (error instanceof HttpException) {
            const status: number = error.status || 500;
            const message: string = error.message || 'Something went wrong!';
            const data: any = error.data || {};
            return generalResponse(req, res, data, message, 'error', error.toast, status);
        }
        else if (error instanceof Error) {
            return generalResponse(req, res, error, error.message, 'error', true, 400);
        }
    } catch (err) {
        next(err);
    }
    return true;
};

// // if the Promise is rejected this will catch it
process.on('unhandledRejection', (error) => {
    console.log('Unhandled Rejection', error);
    // throw error;
});

process.on('uncaughtException', (error) => {
    console.log('Uncaught Exception', error);
});

export default errorMiddleware;
