import { Router } from 'express';
import { isAdmin, isValidToken } from '../middlewares/jwtHandler';
import {
    createNewPro,
    deletePro,
    getAllPros,
    getOnePro,
    updatePro,
} from '../controllers/ProfessionalController';
import {
    createProSchema,
    getProfessionalSchema,
} from '../schemas/professionalSchemas';
import validateHandler from '../middlewares/ValidationHandler';

const router = Router();

router.get('/', [isValidToken, isAdmin], getAllPros);

router.get(
    '/:id',
    [validateHandler(getProfessionalSchema, 'params'), isValidToken, isAdmin],
    getOnePro
);

router.post(
    '/create',
    [validateHandler(createProSchema, 'body'), isValidToken, isAdmin],
    createNewPro
);

router.put(
    '/update/:id',
    [
        validateHandler(getProfessionalSchema, 'params'),
        validateHandler(createProSchema, 'body'),
        isValidToken,
        isAdmin,
    ],
    updatePro
);

router.delete(
    '/delete/:id',
    [validateHandler(getProfessionalSchema, 'params'), isValidToken, isAdmin],
    deletePro
);

export default router;
