import bcrypt from 'bcryptjs';
import boom from '@hapi/boom';
import { IUser, IUserSignUp } from '../interfaces/userInterfaces';
import { ProfessionalModel, UserModel } from '../models/index';

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

    async assign(userId: string, registerScore: string) {
        const user = await UserModel.findByPk(userId);

        if (!user) {
            throw boom.badRequest('Usuario no encontrado');
        }
        if (!registerScore) {
            throw boom.badRequest('Puntaje Inválido');
        }

        const score = parseInt(registerScore, 10);

        let professionalRange: number | null = null;
        let professionalId: number | null = null;

        if (score >= 5 && score <= 7) {
            professionalRange = 1;
        } else if (score >= 8 && score <= 10) {
            professionalRange = 2;
        } else if (score >= 11 && score <= 13) {
            professionalRange = 3;
        } else if (score >= 14 && score <= 15) {
            professionalRange = 4;
        }

        if (professionalRange !== null) {
            const professionalFind = await ProfessionalModel.findOne({
                where: { range: professionalRange },
            });

            if (professionalFind) {
                professionalId = professionalFind.id;
                user.professionalName = professionalFind.professionalName;
            }
        }

        user.professionalId = professionalId;
        user.registerScore = score;

        await user.save();

        return user;
    }

    async addInfo(
        userId: string,
        phoneNumber: string,
        city: string,
        genre: string,
        age: string
    ) {
        const user = await UserModel.findByPk(userId);

        if (!user) {
            throw boom.badRequest('Usuario  no encontrado');
        }

        user.phoneNumber = phoneNumber;
        user.city = city;
        user.genre = genre;
        user.age = age;

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
