import { Application, Router } from 'express';

import userRoutes from './UserRoutes';
import professionalRoutes from './ProfessionalRoutes';
import questionRoutes from './QuestionRoutes';

const appRoutes = (app: Application) => {
    const router = Router();
    app.use('/api/v1', router);
    router.use('/professionals', professionalRoutes);
    router.use('/users', userRoutes);
    router.use('/questions', questionRoutes);
};

export default appRoutes;
