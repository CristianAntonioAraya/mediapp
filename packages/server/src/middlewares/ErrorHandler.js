"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.logError = exports.boomErrorHandler = void 0;
const logError = (err, req, res, next) => {
    // console.error(err);
    next(err);
};
exports.logError = logError;
const boomErrorHandler = (err, req, res, next) => {
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json({
            ok: false,
            error: output.payload.error,
            msg: output.payload.message,
            statusCode: output.payload.statusCode,
        });
    }
    else {
        next(err);
    }
};
exports.boomErrorHandler = boomErrorHandler;
const handleError = (err, req, res, next) => {
    res.status(500).json({
        ok: false,
        msg: err.message,
        stack: err.stack,
    });
};
exports.handleError = handleError;
