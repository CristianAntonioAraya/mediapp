"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.signInSchema = exports.signUpSchema = exports.getUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.string();
const userName = joi_1.default.string();
const password = joi_1.default.string().min(6);
const email = joi_1.default.string().email();
const role = joi_1.default.string();
const getUserSchema = joi_1.default.object({
    id: id.required(),
});
exports.getUserSchema = getUserSchema;
const signUpSchema = joi_1.default.object({
    userName: userName.required(),
    password: password.required(),
    email: email.required(),
    role: role.default('patient'),
    registerScore: joi_1.default.number().allow(null),
    phoneNumber: joi_1.default.string().allow(null),
    city: joi_1.default.string().allow(null),
    genre: joi_1.default.string().allow(null),
    age: joi_1.default.date().allow(null),
    professionalId: joi_1.default.number().allow(null),
    professionalName: joi_1.default.string().allow(null),
});
exports.signUpSchema = signUpSchema;
const signInSchema = joi_1.default.object({
    password: password.required(),
    email: email.required(),
});
exports.signInSchema = signInSchema;
const updateUserSchema = joi_1.default.object({
    userName: userName.required(),
    password: password.required(),
    email: email.required(),
    phoneNumber: joi_1.default.string(),
    city: joi_1.default.string(),
    gente: joi_1.default.string(),
    age: joi_1.default.string(),
});
exports.updateUserSchema = updateUserSchema;
