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
class ProfessionalServices {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const pros = yield index_1.ProfessionalModel.findAll();
            return pros;
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const pro = yield index_1.ProfessionalModel.findByPk(id);
            if (!pro) {
                throw boom_1.default.badRequest('Professional no encontrado');
            }
            return pro;
        });
    }
    create(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { professionalName, speciality, range } = request;
            const count = yield index_1.ProfessionalModel.count();
            const maxRecords = 4;
            if (count >= maxRecords) {
                throw boom_1.default.badRequest('Se alcanzó el máximo de registros de profesionales');
            }
            const checkPro = yield index_1.ProfessionalModel.findOne({
                where: { professionalName },
            });
            if (checkPro) {
                throw boom_1.default.badRequest('Profesional ya existente');
            }
            const newPro = yield index_1.ProfessionalModel.create({
                professionalName,
                speciality,
                range,
            });
            return newPro;
        });
    }
    update(id, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const pro = yield index_1.ProfessionalModel.findByPk(id);
            if (!pro) {
                throw boom_1.default.badRequest('Profesional no encontrado');
            }
            const updatedPro = yield pro.update(request);
            return updatedPro;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const pro = yield index_1.ProfessionalModel.findByPk(id);
            if (!pro) {
                throw boom_1.default.badRequest('Usuario no encontrado');
            }
            yield pro.destroy();
            return;
        });
    }
}
exports.default = ProfessionalServices;
