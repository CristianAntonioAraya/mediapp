import boom from '@hapi/boom';
import { QuestionModel } from '../models/index';
import { IQuestion } from '../interfaces/questionInterfaces.js';

class QuestionServices {
    async getAll() {
        const question = await QuestionModel.findAll();
        return question;
    }
    async getOne(id: string) {
        const question = await QuestionModel.findByPk(id);
        if (!question) {
            throw boom.badRequest('Pregunta no encontrada');
        }
        return question;
    }
    async create(request: IQuestion) {
        const {
            statement,
            alternative1,
            score1,
            alternative2,
            score2,
            alternative3,
            score3,
        } = request;

        const count = await QuestionModel.count();

        const maxRecords = 4;

        if (count >= maxRecords) {
            throw boom.badRequest(
                'Se alcanzó el máximo de registros de preguntas'
            );
        }

        const checkQuestion = await QuestionModel.findOne({
            where: { statement },
        });
        if (checkQuestion) {
            throw boom.badRequest('Pregunta ya existente');
        }

        const newQuestion = await QuestionModel.create({
            statement,
            alternative1,
            score1,
            alternative2,
            score2,
            alternative3,
            score3,
        });

        return newQuestion;
    }
    async update(id: string, request: IQuestion) {
        const question = await QuestionModel.findByPk(id);
        if (!question) {
            throw boom.badRequest('Pregunta no encontrada');
        }
        const updatedQuestion = await question.update(request);

        return updatedQuestion;
    }
    async delete(id: string) {
        const question = await QuestionModel.findByPk(id);
        if (!question) {
            throw boom.badRequest('Pregunta no encontrada');
        }
        await question.destroy();
        return;
    }
}

export default QuestionServices;
