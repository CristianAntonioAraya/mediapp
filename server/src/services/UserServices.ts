import bcrypt from 'bcryptjs';
import boom from '@hapi/boom';
import { IUser, IUserSignUp } from '../interfaces/userInterfaces';
import { ProfessionalModel, UserModel } from '../models/index';
import { string } from 'joi';

class UserServices {
    async getAll() {
        const users = await UserModel.findAll();
        return users;
    }

    async singIn(request: IUserSignUp) {
        const { email, password } = request;

        const checkUser = await UserModel.findOne({
            where: { email },
        });

        if (!checkUser) {
            throw boom.badRequest('Usuario no encontrado');
        }

        const isValidPassword = bcrypt.compareSync(
            password,
            checkUser.password
        );
        if (!isValidPassword) {
            throw boom.unauthorized('Contraseña incorrecta');
        }

        return checkUser;
    }

    async signUp(request: IUser) {
        const { userName, email, password, role } = request;

        const checkUser = await UserModel.findOne({ where: { email } });
        if (checkUser) {
            throw boom.badRequest('Usuario ya existente');
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = await UserModel.create({
            userName,
            email,
            password: hashedPassword,
            role,
        });

        return newUser;
    }

    async getOne(id: string) {
        const user = await UserModel.findByPk(id);
        if (!user) {
            throw boom.badRequest('Usuario no encontrado');
        }
        return user;
    }

    async update(request: IUser, id: string) {
        const user = await UserModel.findByPk(id);
        if (!user) {
            throw boom.badRequest('Usuario no encontrado');
        }
        const updatedUser = await user.update(request);

        return updatedUser;
    }

    async assign(userId: string, professionalId: string) {
        const user = await UserModel.findByPk(userId);
        const professional = await ProfessionalModel.findByPk(professionalId);

        if (!user) {
            throw boom.badRequest('Usuario  no encontrado');
        }
        if (!professional) {
            throw boom.badRequest('Profesional no encontrado');
        }

        user.professionalId = professional.id;
        user.professionalName = professional.professionalName;

        await user.save();

        return user;
    }
    async addInfo(
        userId: string,
        phoneNumber: string,
        city: string,
        genre: string,
        birthday: string
    ) {
        const user = await UserModel.findByPk(userId);

        if (!user) {
            throw boom.badRequest('Usuario  no encontrado');
        }

        user.phoneNumber = phoneNumber;
        user.city = city;
        user.genre = genre;
        user.birthdate = birthday;

        await user.save();

        return user;
    }

    async delete(id: string) {
        const user = await UserModel.findByPk(id);
        if (!user) {
            throw boom.badRequest('Usuario no encontrado');
        }
        await user.destroy();
        return;
    }
}

export default UserServices;
