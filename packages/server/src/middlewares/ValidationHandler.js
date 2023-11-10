"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateHandler = (schema, property) => {
    return (req, res, next) => {
        const data = req[property];
        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            next(error);
        }
        else {
            next();
        }
    };
};
exports.default = validateHandler;
