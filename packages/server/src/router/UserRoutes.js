"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const ValidationHandler_1 = __importDefault(require("../middlewares/ValidationHandler"));
const userSchemas_1 = require("../schemas/userSchemas");
const jwtHandler_1 = require("../middlewares/jwtHandler");
const router = (0, express_1.Router)();
router.get('/', jwtHandler_1.isValidToken, jwtHandler_1.isAdmin, UserController_1.getUsers);
router.get('/:id', [(0, ValidationHandler_1.default)(userSchemas_1.getUserSchema, 'params'), jwtHandler_1.isValidToken], UserController_1.getOneUser);
router.post('/signUp', (0, ValidationHandler_1.default)(userSchemas_1.signUpSchema, 'body'), UserController_1.signUp);
router.post('/signIn', (0, ValidationHandler_1.default)(userSchemas_1.signInSchema, 'body'), UserController_1.signIn);
router.put('/update/:id', [
    (0, ValidationHandler_1.default)(userSchemas_1.getUserSchema, 'params'),
    (0, ValidationHandler_1.default)(userSchemas_1.updateUserSchema, 'body'),
    jwtHandler_1.isValidToken,
], UserController_1.updateUser);
router.delete('/delete/:id', [(0, ValidationHandler_1.default)(userSchemas_1.getUserSchema, 'params'), jwtHandler_1.isValidToken], UserController_1.deleteUser);
router.patch('/assign/:id', [jwtHandler_1.isValidToken], UserController_1.assignProToUser);
router.patch('/addinfo/:id', [jwtHandler_1.isValidToken], UserController_1.addInfoUser);
exports.default = router;
