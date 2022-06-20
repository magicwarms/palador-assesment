import { readFileSync, unlink } from 'fs';
import NodeCache from 'node-cache';
import { Organization } from '../organization/entity/Organization';

const cache = new NodeCache({ stdTTL: 0 });

const getOrganizationData = (): Organization[] | undefined => {
    const cacheId = 'organization-data';
    if (cache.has(cacheId)) {
        return cache.get(cacheId);
    } else {
        const jsonFilePath = `${process.cwd()}/src/apps/organization/organization-tree.json`;
        const readFile = JSON.parse(readFileSync(jsonFilePath, 'utf8'));
        cache.set(cacheId, readFile);
        if (process.env.NODE_ENV === 'production') {
            unlink(jsonFilePath, (err) => {
                if (err) return err;
            });
        }
        return readFile;
    }
};

const getEmployeeByManagerId = (managerId: number): Organization | undefined => {
    return getOrganizationData()?.find((el) => el.employeeId === managerId);
};

export { getOrganizationData, getEmployeeByManagerId };
