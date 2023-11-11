import { Request, Response, NextFunction } from 'express';
import { IQuestion } from '../interfaces/questionInterfaces';
import QuestionServices from '../services/QuestionServices';

const services = new QuestionServices();

export async function getAllQuestions(
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const question = await services.getAll();
        if (question.length === 0) {
            res.json({ ok: true, msg: 'No hay Preguntas registradas' });
        } else {
            res.status(200).json({ ok: true, question });
        }
    } catch (error) {
        next(error);
    }
}

export async function getOneQuestion(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const id: string = req.params.id;
        const question = await services.getOne(id);
        res.status(201).json({ ok: true, pro: question });
    } catch (error) {
        next(error);
    }
}

export async function createNewQuestion(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const questionData: IQuestion = req.body;
        console.log('data body --->', questionData);
        const pro = await services.create(questionData);
        res.status(201).json({ ok: true, pro });
    } catch (error) {
        console.log('error --->', error);
        next(error);
    }
}

export async function updateQuestion(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const id: string = req.params.id;
        const questionData: IQuestion = req.body;
        const updatedQuestion = await services.update(id, questionData);
        res.status(201).json({ ok: true, updatedQuestion });
    } catch (error) {
        next(error);
    }
}

export async function deleteQuestion(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const id: string = req.params.id;
        await services.delete(id);

        res.status(200).json({
            ok: true,
            msg: 'Pregunta eliminada',
        });
    } catch (error) {
        next(error);
    }
}
