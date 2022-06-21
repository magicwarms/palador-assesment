import { getOrganizationData, getEmployeeByManagerId, getEmployeeByEmployeeId } from './organization.repositories';
import { Organization, IDMapping } from './entity/Organization';

/**
 * Service Methods
 */

export const getAllEmployees = async (): Promise<Organization[] | undefined> => {
    const getOrganization = getOrganizationData();

    const newEmployees: Organization[] = [];
    getOrganization?.forEach((item) => {
        const managerId = item.managerId;
        const findManagerData = managerId !== undefined ? getEmployeeByManagerId(managerId) : null;
        let manager = null;
        if (findManagerData) {
            manager = { employeeId: findManagerData?.employeeId, name: findManagerData.name, status: 'active' };
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

export const getEmployeeById = (employeeId: number, includeReportTree: boolean): Organization | undefined | null => {
    const employee = getEmployeeByEmployeeId(employeeId);
    if (!employee) return null;
    const managerId = employee.managerId;
    const findManagerData = managerId !== undefined ? getEmployeeByManagerId(managerId) : null;
    let manager = null;
    if (findManagerData) {
        manager = { employeeId: findManagerData?.employeeId, name: findManagerData.name, status: 'active' };
    }
    let root;
    if (includeReportTree) {
        const getAllOrganization = getOrganizationData();
        if (getAllOrganization) {
            const idMapping = getAllOrganization.reduce((acc, el, i) => {
                acc[el.employeeId] = i;
                return acc;
            }, {} as IDMapping);
            getAllOrganization.forEach((el) => {
                // Handle the root element
                if (!el.managerId) {
                    root = el;
                    return;
                }
                // Use our mapping to locate the parent element in our data array
                const parentEl = getAllOrganization[idMapping[el.managerId]];
                // Add our current el to its parent's `directReports` array
                parentEl.directReports = [...(parentEl.directReports || []), el];
            });
        }
    }
    return {
        name: employee.name,
        employeeId: employee.employeeId,
        status: 'active',
        manager,
        directReports: root
    };
};
