import { Request, Response, NextFunction } from 'express';
import ProfessionalServices from '../services/ProfessionalServices';
import { IPro } from '../interfaces/professionalInterfaces';

const services = new ProfessionalServices();

export async function getAllPros(
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const pro = await services.getAll();
        if (pro.length === 0) {
            res.json({ ok: true, msg: 'No hay profesionales registrados' });
        } else {
            res.status(200).json({ ok: true, pro });
        }
    } catch (error) {
        next(error);
    }
}

export async function getOnePro(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const id: string = req.params.id;
        const pro = await services.getOne(id);
        res.status(201).json({ ok: true, pro });
    } catch (error) {
        next(error);
    }
}

export async function createNewPro(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const professionalData: IPro = req.body;
        const pro = await services.create(professionalData);
        res.status(201).json({ ok: true, pro });
    } catch (error) {
        next(error);
    }
}

export async function updatePro(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const id: string = req.params.id;
        const professionalData: IPro = req.body;
        const updatedPro = await services.update(id, professionalData);
        res.status(201).json({ ok: true, updatedPro });
    } catch (error) {
        next(error);
    }
}

export async function deletePro(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const id: string = req.params.id;

        await services.delete(id);

        res.status(200).json({
            ok: true,
            msg: 'Registro de profesional eliminado',
        });
    } catch (error) {
        next(error);
    }
}
