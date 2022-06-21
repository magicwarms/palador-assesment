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

export default organizationRouter;
