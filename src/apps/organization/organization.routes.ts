/**
 * Required External Modules and Interfaces
 */
import express from 'express';
import * as OrganizationController from './organization.controller';
/**
 * Router Definition
 */
const organizationRouter = express.Router();
/**
 * Controller Definitions
 */
organizationRouter.get('/', OrganizationController.convertReconcilationReportToCSV);

export default organizationRouter;
