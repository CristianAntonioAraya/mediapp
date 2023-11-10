"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwtHandler_1 = require("../middlewares/jwtHandler");
const ValidationHandler_1 = __importDefault(require("../middlewares/ValidationHandler"));
const questionSchemas_1 = require("../schemas/questionSchemas");
const QuestionController_1 = require("../controllers/QuestionController");
const router = (0, express_1.Router)();
router.get('/', [jwtHandler_1.isValidToken], QuestionController_1.getAllQuestions);
router.get('/:id', [(0, ValidationHandler_1.default)(questionSchemas_1.getQuestionSchema, 'params'), jwtHandler_1.isValidToken, jwtHandler_1.isAdmin], QuestionController_1.getOneQuestion);
router.post('/create', [(0, ValidationHandler_1.default)(questionSchemas_1.createQuestionSchema, 'body'), jwtHandler_1.isValidToken, jwtHandler_1.isAdmin], QuestionController_1.createNewQuestion);
router.put('/update/:id', [
    (0, ValidationHandler_1.default)(questionSchemas_1.getQuestionSchema, 'params'),
    (0, ValidationHandler_1.default)(questionSchemas_1.createQuestionSchema, 'body'),
    jwtHandler_1.isValidToken,
    jwtHandler_1.isAdmin,
], QuestionController_1.updateQuestion);
router.delete('/delete/:id', [(0, ValidationHandler_1.default)(questionSchemas_1.getQuestionSchema, 'params'), jwtHandler_1.isValidToken, jwtHandler_1.isAdmin], QuestionController_1.deleteQuestion);
exports.default = router;
