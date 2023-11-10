import { Request, Response, NextFunction } from 'express';

type PropertyType = 'params' | 'body';

const validateHandler = (schema: any, property: PropertyType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const data = req[property];
        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            next(error);
        } else {
            next();
        }
    };
};

export default validateHandler;
