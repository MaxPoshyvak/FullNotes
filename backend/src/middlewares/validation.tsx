import { AnyObjectSchema } from 'yup';

import { NextFunction, Request, Response } from 'express';

export const validate = (schema: AnyObjectSchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body = await schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });
        next();
    } catch (err: any) {
        return res.status(400).json({
            errors: err.errors,
        });
    }
};
