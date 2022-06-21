/*
 * File: organization.routes.ts
 * Project: palador-assesment
 * File Created: Monday, 21th June 2022
 * Author: Andhana Utama (andhanautama@gmail.com)
 * -----
 * Last Modified: Thursday, 21th June 2022
 * Modified By: Andhana Utama (andhanautama@gmail.com>)
 * -----
 * Copyright 2022 Andhana Utama
 */

/**
 * Required External Modules and Interfaces
 */
import express from 'express';
import * as OrganizationController from './organization.controllers';
/**
 * Router Definition
 */
const organizationRouter = express.Router();
/**
 * Controller Definitions
 */
organizationRouter.get('/', OrganizationController.getAll);
organizationRouter.get('/:employeeId', OrganizationController.getById);
organizationRouter.post('/', OrganizationController.add);
organizationRouter.delete('/:employeeId', OrganizationController.deleteById);

export default organizationRouter;
