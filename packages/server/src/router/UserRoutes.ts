import { Router } from 'express';
import {
    addInfoUser,
    assignProToUser,
    deleteUser,
    getOneUser,
    getUsers,
    signIn,
    signUp,
    updateUser,
} from '../controllers/UserController';
import validateHandler from '../middlewares/ValidationHandler';
import {
    getUserSchema,
    signInSchema,
    signUpSchema,
    updateUserSchema,
} from '../schemas/userSchemas';
import { isAdmin, isValidToken } from '../middlewares/jwtHandler';

const router = Router();

router.get('/', isValidToken, isAdmin, getUsers);

router.get(
    '/:id',
    [validateHandler(getUserSchema, 'params'), isValidToken],
    getOneUser
);

router.post('/signUp', validateHandler(signUpSchema, 'body'), signUp);

router.post('/signIn', validateHandler(signInSchema, 'body'), signIn);

router.put(
    '/update/:id',
    [
        validateHandler(getUserSchema, 'params'),
        validateHandler(updateUserSchema, 'body'),
        isValidToken,
    ],
    updateUser
);

router.delete(
    '/delete/:id',
    [validateHandler(getUserSchema, 'params'), isValidToken],
    deleteUser
);

router.patch('/assign/:id', [isValidToken], assignProToUser);

router.patch('/addinfo/:id', [isValidToken], addInfoUser);

export default router;
