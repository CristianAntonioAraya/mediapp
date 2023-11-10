"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateQuestionSchema = exports.createQuestionSchema = exports.getQuestionSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.string();
const statement = joi_1.default.string();
const alternative1 = joi_1.default.string();
const score1 = joi_1.default.number();
const alternative2 = joi_1.default.string();
const score2 = joi_1.default.number();
const alternative3 = joi_1.default.string();
const score3 = joi_1.default.number();
const getQuestionSchema = joi_1.default.object({
    id: id.required(),
});
exports.getQuestionSchema = getQuestionSchema;
const createQuestionSchema = joi_1.default.object({
    statement: statement.required(),
    alternative1: alternative1.required(),
    score1: score1.required(),
    alternative2: alternative2.required(),
    score2: score2.required(),
    alternative3: alternative3.required(),
    score3: score3.required(),
});
exports.createQuestionSchema = createQuestionSchema;
const updateQuestionSchema = joi_1.default.object({
    statement: statement.required(),
    alternative1: alternative1.required(),
    score1: score1.required(),
    alternative2: alternative2.required(),
    score2: score2.required(),
    alternative3: alternative3.required(),
    score3: score3.required(),
});
exports.updateQuestionSchema = updateQuestionSchema;
