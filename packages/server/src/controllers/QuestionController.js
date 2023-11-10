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
exports.deleteQuestion = exports.updateQuestion = exports.createNewQuestion = exports.getOneQuestion = exports.getAllQuestions = void 0;
const QuestionServices_1 = __importDefault(require("../services/QuestionServices"));
const services = new QuestionServices_1.default();
function getAllQuestions(_req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const question = yield services.getAll();
            if (question.length === 0) {
                res.json({ ok: true, msg: 'No hay Preguntas registradas' });
            }
            else {
                res.status(200).json({ ok: true, question });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getAllQuestions = getAllQuestions;
function getOneQuestion(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const question = yield services.getOne(id);
            res.status(201).json({ ok: true, pro: question });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getOneQuestion = getOneQuestion;
function createNewQuestion(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const questionData = req.body;
            const pro = yield services.create(questionData);
            res.status(201).json({ ok: true, pro });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.createNewQuestion = createNewQuestion;
function updateQuestion(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const questionData = req.body;
            const updatedQuestion = yield services.update(id, questionData);
            res.status(201).json({ ok: true, updatedQuestion });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updateQuestion = updateQuestion;
function deleteQuestion(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            yield services.delete(id);
            res.status(200).json({
                ok: true,
                msg: 'Pregunta eliminada',
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteQuestion = deleteQuestion;
