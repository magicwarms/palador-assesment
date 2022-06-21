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
organizationRouter.put('/', OrganizationController.updateById);

export default organizationRouter;
