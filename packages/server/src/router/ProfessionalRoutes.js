"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwtHandler_1 = require("../middlewares/jwtHandler");
const ProfessionalController_1 = require("../controllers/ProfessionalController");
const professionalSchemas_1 = require("../schemas/professionalSchemas");
const ValidationHandler_1 = __importDefault(require("../middlewares/ValidationHandler"));
const router = (0, express_1.Router)();
router.get('/', [jwtHandler_1.isValidToken, jwtHandler_1.isAdmin], ProfessionalController_1.getAllPros);
router.get('/:id', [(0, ValidationHandler_1.default)(professionalSchemas_1.getProfessionalSchema, 'params'), jwtHandler_1.isValidToken, jwtHandler_1.isAdmin], ProfessionalController_1.getOnePro);
router.post('/create', [(0, ValidationHandler_1.default)(professionalSchemas_1.createProSchema, 'body'), jwtHandler_1.isValidToken, jwtHandler_1.isAdmin], ProfessionalController_1.createNewPro);
router.put('/update/:id', [
    (0, ValidationHandler_1.default)(professionalSchemas_1.getProfessionalSchema, 'params'),
    (0, ValidationHandler_1.default)(professionalSchemas_1.createProSchema, 'body'),
    jwtHandler_1.isValidToken,
    jwtHandler_1.isAdmin,
], ProfessionalController_1.updatePro);
router.delete('/delete/:id', [(0, ValidationHandler_1.default)(professionalSchemas_1.getProfessionalSchema, 'params'), jwtHandler_1.isValidToken, jwtHandler_1.isAdmin], ProfessionalController_1.deletePro);
exports.default = router;
