/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
dotenv.config();
import express, { Application, NextFunction, Request, Response } from 'express';

import router from './routes';

const app: Application = express();

/**
 *  App Configuration
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

// handle 404
app.use((_req: Request, res: Response) => {
    return res.status(404).json({
        success: true,
        data: {},
        message: 'API route not found'
    });
});

type errorFormat = {
    success: boolean;
    data: string | boolean | Error;
    message: string;
};

// handle 500 Any error
app.use((err: errorFormat, _req: Request, res: Response, _next: NextFunction): Response => {
    return res.status(500).json({
        success: false,
        data: {},
        message: `Error! (${err.message})`
    });
});

export default app;
