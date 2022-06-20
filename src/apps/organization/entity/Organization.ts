export type Organization = {
    name: string;
    employeeId?: number;
    managerId?: number;
    status: string;
    manager?: Organization | null;
    directReports?: Organization[];
};
