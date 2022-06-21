/*
 * File: organization.controllers.ts
 * Project: palador-assesment
 * File Created: Monday, 21th June 2022
 * Author: Andhana Utama (andhanautama@gmail.com)
 * -----
 * Last Modified: Thursday, 21th June 2022
 * Modified By: Andhana Utama (andhanautama@gmail.com>)
 * -----
 * Copyright 2022 Andhana Utama
 */

import { Request, Response, NextFunction } from 'express';

import { getAllEmployees, getEmployeeById, addEmployee, deleteEmployeeById } from './organization.services';

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
                data: {},
                message: 'Employee ID not valid and must be number'
            });
        }
        const getEmployeeDataById = getEmployeeById(+employeeId, includeReportTree);
        return res.status(getEmployeeDataById !== null ? 200 : 404).json({
            success: true,
            data: getEmployeeDataById === null ? {} : getEmployeeDataById,
            message: getEmployeeDataById !== null ? 'Employee found' : 'Employee not found'
        });
    } catch (err) {
        next(err);
    }
};

export const add = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
        const { name, status, managerId } = req.body;
        const data = { name, status, managerId };

        const createEmployee = await addEmployee(data);
        return res.status(201).json({
            success: true,
            data: { employeeId: createEmployee },
            message: 'Employee created'
        });
    } catch (err) {
        next(err);
    }
};

export const deleteById = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
        const employeeId = req.params.employeeId;
        if (employeeId.search(/[0-9]/) < 0 || !employeeId) {
            return res.status(400).json({
                success: false,
                data: {},
                message: 'Employee ID not valid and must be number'
            });
        }
        await deleteEmployeeById(+employeeId);
        return res.status(200).json({
            success: true,
            data: {},
            message: 'Employee data has been deleted'
        });
    } catch (err) {
        next(err);
    }
};
