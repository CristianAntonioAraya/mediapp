"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserRoutes_1 = __importDefault(require("./UserRoutes"));
const ProfessionalRoutes_1 = __importDefault(require("./ProfessionalRoutes"));
const QuestionRoutes_1 = __importDefault(require("./QuestionRoutes"));
const appRoutes = (app) => {
    const router = (0, express_1.Router)();
    app.use('/api/v1', router);
    router.use('/professionals', ProfessionalRoutes_1.default);
    router.use('/users', UserRoutes_1.default);
    router.use('/questions', QuestionRoutes_1.default);
};
exports.default = appRoutes;
