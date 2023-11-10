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
exports.deleteUser = exports.addInfoUser = exports.assignProToUser = exports.updateUser = exports.signIn = exports.signUp = exports.getOneUser = exports.getUsers = void 0;
const UserServices_1 = __importDefault(require("../services/UserServices"));
const jwtHandler_1 = require("../middlewares/jwtHandler");
const services = new UserServices_1.default();
function getUsers(_req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield services.getAll();
            if (users.length === 0) {
                res.json({ ok: true, msg: 'No hay usuarios registrados' });
            }
            else {
                res.status(200).json({ ok: true, users });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getUsers = getUsers;
function getOneUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const user = yield services.getOne(id);
            res.status(201).json({ ok: true, user });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getOneUser = getOneUser;
function signUp(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userData = req.body;
            const user = yield services.signUp(userData);
            const token = yield (0, jwtHandler_1.generateToken)(user.userName, user.id.toString(), user.role);
            res.status(201).json({
                ok: true,
                user: {
                    userName: user.userName,
                    email: user.email,
                    role: user.role,
                    id: user.id,
                    token,
                },
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.signUp = signUp;
function signIn(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userData = req.body;
            const user = yield services.singIn(userData);
            const token = yield (0, jwtHandler_1.generateToken)(user.userName, user.id.toString(), user.role);
            res.status(200).json({
                ok: true,
                user: {
                    userName: user.userName,
                    email: user.email,
                    role: user.role,
                    id: user.id,
                    token,
                },
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.signIn = signIn;
function updateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const userData = req.body;
            const updatedUser = yield services.update(userData, id);
            res.status(201).json({ ok: true, updatedUser });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updateUser = updateUser;
function assignProToUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.params.id;
            const { registerScore } = req.body;
            const updatedUser = yield services.assign(userId, registerScore);
            res.status(201).json({ ok: true, updatedUser });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.assignProToUser = assignProToUser;
function addInfoUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.params.id;
            const { phoneNumber, city, genre, age } = req.body;
            const updatedUser = yield services.addInfo(userId, phoneNumber, city, genre, age);
            res.status(201).json({ ok: true, updatedUser });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.addInfoUser = addInfoUser;
function deleteUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            yield services.delete(id);
            res.status(200).json({
                ok: true,
                msg: 'Registro de usuario eliminado',
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteUser = deleteUser;
