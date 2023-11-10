import { Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom';

const logError = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    // console.error(err);
    next(err);
};

const boomErrorHandler = (
    err: boom.Boom,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json({
            ok: false,
            error: output.payload.error,
            msg: output.payload.message,
            statusCode: output.payload.statusCode,
        });
    } else {
        next(err);
    }
};

const handleError = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    res.status(500).json({
        ok: false,
        msg: err.message,
        stack: err.stack,
    });
};

export { boomErrorHandler, logError, handleError };
