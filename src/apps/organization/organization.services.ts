/*
 * File: organization.services.ts
 * Project: palador-assesment
 * File Created: Monday, 21th June 2022
 * Author: Andhana Utama (andhanautama@gmail.com)
 * -----
 * Last Modified: Thursday, 21th June 2022
 * Modified By: Andhana Utama (andhanautama@gmail.com>)
 * -----
 * Copyright 2022 Andhana Utama
 */

import {
    getOrganizationData,
    getEmployeeByManagerId,
    getEmployeeByEmployeeId,
    cacheId,
    cache
} from './organization.repositories';
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
    let root: Organization = {
        employeeId: 0,
        name: '',
        managerId: 0,
        status: ''
    };
    if (includeReportTree) {
        const getAllOrganization = getOrganizationData();
        if (getAllOrganization) {
            const idMapping = getAllOrganization.reduce((acc, el, i) => {
                acc[el.employeeId as number] = i;
                return acc;
            }, {} as IDMapping);
            getAllOrganization.forEach((el) => {
                // Handle the root element
                if (!el.managerId) {
                    root = el;
                    return;
                }
                // Use our mapping to locate the parent element in our data array
                const parentEl = getAllOrganization[idMapping[el.managerId as number]];
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
            ? root.directReports?.filter((item: Organization) => {
                  if (item.employeeId === employeeId) return item;
              })
            : []
    };
};

export const addEmployee = async (data: { name: string; status: string; managerId: number }): Promise<number> => {
    const getAllOrganization = getOrganizationData();
    let newId = 0;
    if (getAllOrganization) {
        getAllOrganization?.sort((a, b) => a.employeeId - b.employeeId);
        newId = getAllOrganization[getAllOrganization.length - 1].employeeId + 1;
        getAllOrganization?.push({
            employeeId: newId,
            name: data.name,
            status: data.status,
            managerId: data.managerId
        });
        cache.set(cacheId, getAllOrganization);
    }

    return newId;
};

export const deleteEmployeeById = async (employeeId: number): Promise<boolean> => {
    const getAllOrganization = getOrganizationData();
    if (getAllOrganization) {
        const deleteEmployee = getAllOrganization.filter((item) => item.employeeId !== employeeId);
        cache.set(cacheId, deleteEmployee);
    }
    return true;
};

export const updateEmployee = async (data: Organization): Promise<Organization> => {
    const getAllOrganization = getOrganizationData();
    let updatedData: Organization[];
    if (getAllOrganization) {
        updatedData = getAllOrganization.map((item) =>
            item.employeeId === data.employeeId
                ? { ...item, name: data.name, status: data.status, managerId: data.managerId }
                : item
        );
        cache.set(cacheId, updatedData);
    }
    return data;
};
