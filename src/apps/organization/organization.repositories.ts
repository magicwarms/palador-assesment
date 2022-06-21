/*
 * File: organization.repositories.ts
 * Project: palador-assesment
 * File Created: Monday, 21th June 2022
 * Author: Andhana Utama (andhanautama@gmail.com)
 * -----
 * Last Modified: Thursday, 21th June 2022
 * Modified By: Andhana Utama (andhanautama@gmail.com>)
 * -----
 * Copyright 2022 Andhana Utama
 */

import { readFileSync } from 'fs';
import NodeCache from 'node-cache';
import { Organization } from '../organization/entity/Organization';

export const cache = new NodeCache({ stdTTL: 0 });

export const cacheId = 'organization-data';

export const getOrganizationData = (): Organization[] | undefined => {
    if (cache.has(cacheId)) {
        return cache.get(cacheId);
    } else {
        const jsonFilePath = `${process.cwd()}/src/apps/organization/organization-tree.json`;
        const readFile = JSON.parse(readFileSync(jsonFilePath, 'utf8'));
        cache.set(cacheId, readFile);
        return readFile;
    }
};

export const getEmployeeByManagerId = (managerId: number): Organization | undefined => {
    return getOrganizationData()?.find((el) => el.employeeId === managerId);
};

export const getEmployeeByEmployeeId = (employeeId: number): Organization | undefined => {
    return getOrganizationData()?.find((el) => el.employeeId === employeeId);
};
