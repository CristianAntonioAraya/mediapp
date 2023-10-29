import { Router } from 'express';
import { isAdmin, isValidToken } from '../middlewares/jwtHandler';
import validateHandler from '../middlewares/ValidationHandler';
import {
    createQuestionSchema,
    getQuestionSchema,
} from '../schemas/questionSchemas';
import {
    createNewQuestion,
    getAllQuestions,
    getOneQuestion,
    updateQuestion,
} from '../controllers/QuestionController';

const router = Router();

router.get('/', [isValidToken], getAllQuestions);

router.get(
    '/:id',
    [validateHandler(getQuestionSchema, 'params'), isValidToken, isAdmin],
    getOneQuestion
);

router.post(
    '/create',
    [validateHandler(createQuestionSchema, 'body'), isValidToken, isAdmin],
    createNewQuestion
);

router.put(
    '/update/:id',
    [
        validateHandler(getQuestionSchema, 'params'),
        validateHandler(createQuestionSchema, 'body'),
        isValidToken,
        isAdmin,
    ],
    updateQuestion
);

router.delete(
    '/delete/:id',
    [validateHandler(getQuestionSchema, 'params'), isValidToken, isAdmin],
    updateQuestion
);

export default router;
