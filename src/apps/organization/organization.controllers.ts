import { Request, Response, NextFunction } from 'express';

import { getAllEmployees, getEmployeeById } from './organization.services';

export const getAll = async (_req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
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

export const getById = (req: Request, res: Response, next: NextFunction): Response | undefined => {
    try {
        const employeeId = req.params.employeeId;
        const includeReportTree = req.query.includeReportingTree === 'true';

        if (employeeId.search(/[0-9]/) < 0 || !employeeId) {
            return res.status(400).json({
                success: false,
                data: null,
                message: 'Employee ID not valid and must be number'
            });
        }
        const getEmployeeDataById = getEmployeeById(+employeeId, includeReportTree);
        return res.status(getEmployeeDataById !== null ? 200 : 404).json({
            success: true,
            data: getEmployeeDataById === null ? { employeeId } : getEmployeeDataById,
            message: getEmployeeDataById !== null ? 'Employee found' : 'Employee not found'
        });
    } catch (err) {
        next(err);
    }
};
