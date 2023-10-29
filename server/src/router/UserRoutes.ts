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
import { isAdmin, isNotAdmin, isValidToken } from '../middlewares/jwtHandler';

const router = Router();

// Get All users - Requires a valid token and admin role
router.get('/', isValidToken, isAdmin, getUsers);

// Get User details - Requires a valid token
router.get(
    '/:id',
    [validateHandler(getUserSchema, 'params'), isValidToken],
    getOneUser
);

// Register User
router.post('/signUp', validateHandler(signUpSchema, 'body'), signUp);

// Login User
router.post('/signIn', validateHandler(signInSchema, 'body'), signIn);

// Update User - Requires a valid token
router.put(
    '/update/:id',
    [
        validateHandler(getUserSchema, 'params'),
        validateHandler(updateUserSchema, 'body'),
        isValidToken,
    ],
    updateUser
);

// Delete User - Requires a valid token
router.delete(
    '/delete/:id',
    [validateHandler(getUserSchema, 'params'), isValidToken],
    deleteUser
);

// Assign User to Professional - Requires a valid token and the user must not be an admin
router.patch('/assign/:id', [isValidToken, isNotAdmin], assignProToUser);

router.patch('/addinfo/:id', [isValidToken, isNotAdmin], addInfoUser);

export default router;
