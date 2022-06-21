import express, { Request, Response } from 'express';

import organizationRouter from './apps/organization/organization.routes';
/**
 * Router Definition
 */
const router = express.Router();
/**
 * Controller Definitions
 */
router.use('/hello', (_req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        data: {},
        message: `Hello ${process.env.APP_NAME}`
    });
});
router.use('/boom', (): void => {
    throw new Error('Error occured');
});
router.use('/employees', organizationRouter);

export default router;
