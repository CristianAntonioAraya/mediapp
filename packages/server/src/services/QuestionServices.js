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
const boom_1 = __importDefault(require("@hapi/boom"));
const index_1 = require("../models/index");
class QuestionServices {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const question = yield index_1.QuestionModel.findAll();
            return question;
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const question = yield index_1.QuestionModel.findByPk(id);
            if (!question) {
                throw boom_1.default.badRequest('Pregunta no encontrada');
            }
            return question;
        });
    }
    create(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { statement, alternative1, score1, alternative2, score2, alternative3, score3, } = request;
            const count = yield index_1.QuestionModel.count();
            const maxRecords = 4;
            if (count >= maxRecords) {
                throw boom_1.default.badRequest('Se alcanzó el máximo de registros de preguntas');
            }
            const checkQuestion = yield index_1.QuestionModel.findOne({
                where: { statement },
            });
            if (checkQuestion) {
                throw boom_1.default.badRequest('Pregunta ya existente');
            }
            const newQuestion = yield index_1.QuestionModel.create({
                statement,
                alternative1,
                score1,
                alternative2,
                score2,
                alternative3,
                score3,
            });
            return newQuestion;
        });
    }
    update(id, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const question = yield index_1.QuestionModel.findByPk(id);
            if (!question) {
                throw boom_1.default.badRequest('Pregunta no encontrada');
            }
            const updatedQuestion = yield question.update(request);
            return updatedQuestion;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const question = yield index_1.QuestionModel.findByPk(id);
            if (!question) {
                throw boom_1.default.badRequest('Pregunta no encontrada');
            }
            yield question.destroy();
            return;
        });
    }
}
exports.default = QuestionServices;
