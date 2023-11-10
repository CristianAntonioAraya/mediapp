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
exports.deletePro = exports.updatePro = exports.createNewPro = exports.getOnePro = exports.getAllPros = void 0;
const ProfessionalServices_1 = __importDefault(require("../services/ProfessionalServices"));
const services = new ProfessionalServices_1.default();
function getAllPros(_req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pro = yield services.getAll();
            if (pro.length === 0) {
                res.json({ ok: true, msg: 'No hay profesionales registrados' });
            }
            else {
                res.status(200).json({ ok: true, pro });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getAllPros = getAllPros;
function getOnePro(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const pro = yield services.getOne(id);
            res.status(201).json({ ok: true, pro });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getOnePro = getOnePro;
function createNewPro(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const professionalData = req.body;
            const pro = yield services.create(professionalData);
            res.status(201).json({ ok: true, pro });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.createNewPro = createNewPro;
function updatePro(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const professionalData = req.body;
            const updatedPro = yield services.update(id, professionalData);
            res.status(201).json({ ok: true, updatedPro });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updatePro = updatePro;
function deletePro(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            yield services.delete(id);
            res.status(200).json({
                ok: true,
                msg: 'Registro de profesional eliminado',
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deletePro = deletePro;
