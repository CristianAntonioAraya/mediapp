import { Request } from 'express';

type Role = 'admin' | 'patient';

interface IUser {
    _id?: string;
    userName: string;
    email: string;
    password: string;
    role: Role;
    registerScore: number;
    createdAt?: string;
    updatedAt?: string;
    phoneNumber?: string;
    city?: string;
    genre?: string;
    age?: string;
    professionalId?: number | null;
    professionalName?: string | null;
}

interface IUserSignUp {
    email: string;
    password: string;
}

interface IUserRequest extends Request {
    id?: string;
    userName?: string;
}

export { IUser, IUserSignUp, IUserRequest };
