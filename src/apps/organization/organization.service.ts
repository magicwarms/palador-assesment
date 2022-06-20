import { getOrganizationData, getEmployeeByManagerId } from '../utilities/data';
import { Organization } from './entity/Organization';

/**
 * Service Methods
 */

export const getAllEmployees = async (): Promise<Organization[] | undefined> => {
    const getOrganization = getOrganizationData();

    const newEmployees: Organization[] = [];
    getOrganization?.forEach((item) => {
        const findManagerData = getEmployeeByManagerId(item.managerId);
        let manager;
        if (findManagerData !== undefined) {
            manager = { employeeId: findManagerData.employeeId, name: findManagerData.name, status: 'active' };
        }
        newEmployees.push({
            name: item.name,
            employeeId: item.employeeId,
            status: item.status,
            manager,
            directReports: []
        });
    });

    return newEmployees;
};
