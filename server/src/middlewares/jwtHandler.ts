import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUserRequest } from '../interfaces/userInterfaces';

const generateToken = async (id: string, userName: string, role: string) => {
    return new Promise((resolve, rejects) => {
        const payload: JwtPayload = { id, userName, role };

        jwt.sign(
            payload,
            process.env.SECRET_JWT!,
            { expiresIn: '24h' },
            (err, token) => {
                if (err) {
                    console.log(err);
                    rejects('El token no pudo ser creado');
                }
                resolve(token);
            }
        );
    });
};

const isValidToken = async (
    req: IUserRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({ ok: false, msg: 'Falta el token' });
    }
    try {
        const verifiedToken = jwt.verify(
            token,
            process.env.SECRET_JWT!
        ) as JwtPayload;

        req.id = verifiedToken.id;
        req.userName = verifiedToken.userName;
    } catch (error) {
        console.log('Jwt expired or invalid');
        return res.status(400).json({ ok: false, msg: 'Token Inválido' });
    }

    next();
};

const isAdmin = async (
    req: IUserRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(404).json({ ok: false, msg: 'Falta el token' });
    }
    try {
        const verifiedToken = jwt.verify(
            token,
            process.env.SECRET_JWT!
        ) as JwtPayload;

        if (verifiedToken.role !== 'admin') {
            return res.status(401).json({
                ok: false,
                msg: 'No estas autorizado para realizar esta operación',
            });
        }
    } catch (error) {
        console.log('Jwt expired or invalid');
        return res.status(400).json({ ok: false, msg: 'Token Inválido' });
    }

    next();
};

export { generateToken, isValidToken, isAdmin };
