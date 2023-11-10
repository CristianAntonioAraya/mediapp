"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const boom_1 = __importDefault(require("@hapi/boom"));
const index_1 = require("../models/index");
class UserServices {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield index_1.UserModel.findAll();
            return users;
        });
    }
    singIn(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = request;
            const checkUser = yield index_1.UserModel.findOne({
                where: { email },
            });
            if (!checkUser) {
                throw boom_1.default.badRequest('Usuario no encontrado');
            }
            const isValidPassword = bcryptjs_1.default.compareSync(password, checkUser.password);
            if (!isValidPassword) {
                throw boom_1.default.unauthorized('Contraseña incorrecta');
            }
            return checkUser;
        });
    }
    signUp(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userName, email, password, role } = request;
            const checkUser = yield index_1.UserModel.findOne({ where: { email } });
            if (checkUser) {
                throw boom_1.default.badRequest('Usuario ya existente');
            }
            const salt = bcryptjs_1.default.genSaltSync(10);
            const hashedPassword = bcryptjs_1.default.hashSync(password, salt);
            const newUser = yield index_1.UserModel.create({
                userName,
                email,
                password: hashedPassword,
                role,
            });
            return newUser;
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield index_1.UserModel.findByPk(id);
            if (!user) {
                throw boom_1.default.badRequest('Usuario no encontrado');
            }
            return user;
        });
    }
    update(request, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield index_1.UserModel.findByPk(id);
            if (!user) {
                throw boom_1.default.badRequest('Usuario no encontrado');
            }
            const updatedUser = yield user.update(request);
            return updatedUser;
        });
    }
    assign(userId, registerScore) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield index_1.UserModel.findByPk(userId);
            if (!user) {
                throw boom_1.default.badRequest('Usuario no encontrado');
            }
            if (!registerScore) {
                throw boom_1.default.badRequest('Puntaje Inválido');
            }
            const score = parseInt(registerScore, 10);
            let professionalRange = null;
            let professionalId = null;
            if (score >= 5 && score <= 7) {
                professionalRange = 1;
            }
            else if (score >= 8 && score <= 10) {
                professionalRange = 2;
            }
            else if (score >= 11 && score <= 13) {
                professionalRange = 3;
            }
            else if (score >= 14 && score <= 15) {
                professionalRange = 4;
            }
            if (professionalRange !== null) {
                const professionalFind = yield index_1.ProfessionalModel.findOne({
                    where: { range: professionalRange },
                });
                if (professionalFind) {
                    professionalId = professionalFind.id;
                    user.professionalName = professionalFind.professionalName;
                }
            }
            user.professionalId = professionalId;
            user.registerScore = score;
            yield user.save();
            return user;
        });
    }
    addInfo(userId, phoneNumber, city, genre, age) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield index_1.UserModel.findByPk(userId);
            if (!user) {
                throw boom_1.default.badRequest('Usuario  no encontrado');
            }
            user.phoneNumber = phoneNumber;
            user.city = city;
            user.genre = genre;
            user.age = age;
            yield user.save();
            return user;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield index_1.UserModel.findByPk(id);
            if (!user) {
                throw boom_1.default.badRequest('Usuario no encontrado');
            }
            yield user.destroy();
            return;
        });
    }
}
exports.default = UserServices;
