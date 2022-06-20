import { Request, Response, NextFunction } from 'express';

import { getAllEmployees } from './organization.service';

export const convertReconcilationReportToCSV = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | undefined> => {
    try {
        const getAllEmployeesData = await getAllEmployees();
        return res.status(200).json({
            success: true,
            data: getAllEmployeesData,
            message: 'Employees found'
        });
    } catch (err) {
        next(err);
    }
};
