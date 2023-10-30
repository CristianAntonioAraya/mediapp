import { Request, Response, NextFunction } from 'express';
import UserServices from '../services/UserServices';
import { IUser, IUserSignUp } from '../interfaces/userInterfaces.js';
import { generateToken } from '../middlewares/jwtHandler';

const services = new UserServices();

export async function getUsers(
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const users = await services.getAll();
        if (users.length === 0) {
            res.json({ ok: true, msg: 'No hay usuarios registrados' });
        } else {
            res.status(200).json({ ok: true, users });
        }
    } catch (error) {
        next(error);
    }
}

export async function getOneUser(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const id: string = req.params.id;
        const user = await services.getOne(id);
        res.status(201).json({ ok: true, user });
    } catch (error) {
        next(error);
    }
}

export async function signUp(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const userData: IUser = req.body;
        const user = await services.signUp(userData);

        const token = await generateToken(
            user.userName,
            user.id.toString(),
            user.role
        );

        res.status(201).json({
            ok: true,
            user: {
                userName: user.userName,
                email: user.email,
                role: user.role,
                token,
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function signIn(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const userData: IUserSignUp = req.body;

        const user = await services.singIn(userData);

        const token = await generateToken(
            user.userName,
            user.id.toString(),
            user.role
        );

        res.status(200).json({
            ok: true,
            user: {
                userName: user.userName,
                email: user.email,
                role: user.role,
                token,
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function updateUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const id = req.params.id;
        const userData: IUser = req.body;
        const updatedUser = await services.update(userData, id);
        res.status(201).json({ ok: true, updatedUser });
    } catch (error) {
        next(error);
    }
}

export async function assignProToUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userId = req.params.id;
        const { professionalId } = req.body;

        const updatedUser = await services.assign(userId, professionalId);
        res.status(201).json({ ok: true, updatedUser });
    } catch (error) {
        next(error);
    }
}

export async function addInfoUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userId = req.params.id;
        const { phoneNumber, city, genre, age } = req.body;

        const updatedUser = await services.addInfo(
            userId,
            phoneNumber,
            city,
            genre,
            age
        );
        res.status(201).json({ ok: true, updatedUser });
    } catch (error) {
        next(error);
    }
}

export async function deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const id: string = req.params.id;

        await services.delete(id);

        res.status(200).json({
            ok: true,
            msg: 'Registro de usuario eliminado',
        });
    } catch (error) {
        next(error);
    }
}
