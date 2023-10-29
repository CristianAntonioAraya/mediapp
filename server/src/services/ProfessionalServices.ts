import boom from '@hapi/boom';
import { ProfessionalModel } from '../models/index';
import { IPro } from '../interfaces/professionalInterfaces.js';

class ProfessionalServices {
    async getAll() {
        const pros = await ProfessionalModel.findAll();
        return pros;
    }
    async getOne(id: string) {
        const pro = await ProfessionalModel.findByPk(id);
        if (!pro) {
            throw boom.badRequest('Professional no encontrado');
        }
        return pro;
    }
    async create(request: IPro) {
        const { professionalName, speciality } = request;
        const checkPro = await ProfessionalModel.findOne({
            where: { professionalName },
        });
        if (checkPro) {
            throw boom.badRequest('Profesional ya existente');
        }

        const newPro = await ProfessionalModel.create({
            professionalName,
            speciality,
        });

        return newPro;
    }
    async update(id: string, request: IPro) {
        const pro = await ProfessionalModel.findByPk(id);
        if (!pro) {
            throw boom.badRequest('Profesional no encontrado');
        }
        const updatedPro = await pro.update(request);

        return updatedPro;
    }
    async delete(id: string) {
        const pro = await ProfessionalModel.findByPk(id);
        if (!pro) {
            throw boom.badRequest('Usuario no encontrado');
        }
        await pro.destroy();
        return;
    }
}

export default ProfessionalServices;
