"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfessionalSchema = exports.createProSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.string();
const professionalName = joi_1.default.string();
const speciality = joi_1.default.string();
const range = joi_1.default.number();
const getProfessionalSchema = joi_1.default.object({
    id: id.required(),
});
exports.getProfessionalSchema = getProfessionalSchema;
const createProSchema = joi_1.default.object({
    professionalName: professionalName.required(),
    speciality: speciality.required(),
    range: range.required(),
});
exports.createProSchema = createProSchema;
