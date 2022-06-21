import app from '../../../index';
import request from 'supertest';

describe('Employee API Endpoints', () => {
    it('Request /employees (GET) should return correct response objects! - (GET ALL EMPLOYEES)', async () => {
        const result = await request(app).get('/employees').send();

        expect(result.status).toBe(200);
        expect(result.body.success).toEqual(true);
        expect(result.body.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                    employeeId: expect.any(Number),
                    manager: expect.objectContaining({
                        employeeId: expect.any(Number),
                        name: expect.any(String),
                        status: expect.any(String)
                    })
                })
            ])
        );
        expect(result.body.message).toEqual(expect.any(String));
    });

    it('Request /employees/:employeeId?includeReportingTree=false (GET) should return correct response objects! - (GET EMPLOYEE BY ID)', async () => {
        const result = await request(app).get('/employees/7?includeReportingTree=false').send();

        expect(result.status).toBe(200);
        expect(result.body.success).toEqual(true);
        expect(result.body.data).toEqual(
            expect.objectContaining({
                name: expect.any(String),
                employeeId: expect.any(Number),
                status: expect.any(String),
                manager: expect.objectContaining({
                    employeeId: expect.any(Number),
                    name: expect.any(String),
                    status: expect.any(String)
                })
            })
        );
        expect(result.body.message).toEqual(expect.any(String));
    });

    it('Request /employees/:employeeId?includeReportingTree=true (GET) should return correct response objects! - (GET EMPLOYEE BY ID WITH includeReportingTree)', async () => {
        const result = await request(app).get('/employees/12?includeReportingTree=true').send();

        expect(result.status).toBe(200);
        expect(result.body.success).toEqual(true);
        expect(result.body.data).toEqual(
            expect.objectContaining({
                name: expect.any(String),
                employeeId: expect.any(Number),
                status: expect.any(String),
                manager: expect.objectContaining({
                    employeeId: expect.any(Number),
                    name: expect.any(String),
                    status: expect.any(String)
                }),
                directReports: expect.arrayContaining([
                    expect.objectContaining({
                        employeeId: expect.any(Number),
                        name: expect.any(String),
                        directReports: expect.arrayContaining([
                            expect.objectContaining({
                                employeeId: expect.any(Number),
                                name: expect.any(String)
                            })
                        ])
                    })
                ])
            })
        );
        expect(result.body.message).toEqual(expect.any(String));
    });

    it('Request /employees/:invalidId (GET) should return error response objects! - (GET EMPLOYEE BY ID)', async () => {
        const result = await request(app).get('/employees/asd').send();

        expect(result.status).toBe(400);
        expect(result.body.success).toEqual(false);
        expect(result.body.data).toEqual({});
        expect(result.body.message).toEqual(expect.any(String));
    });

    it("Request /employees/:employeeId (GET) that doesn't exists should return 404/not found response objects! - (GET EMPLOYEE BY ID)", async () => {
        const result = await request(app).get('/employees/1234').send();

        expect(result.status).toBe(404);
        expect(result.body.success).toEqual(true);
        expect(result.body.data).toEqual({});
        expect(result.body.message).toEqual(expect.any(String));
    });

    it('Request /employees (POST). It should create a new employee', async () => {
        const result = await request(app).post('/employees').send({
            name: 'Employee Tests Create',
            status: 'active',
            managerId: 15
        });
        expect(result.status).toBe(201);
        expect(result.body.success).toEqual(true);
        expect(result.body.data).toEqual(
            expect.objectContaining({
                employeeId: expect.any(Number)
            })
        );
        expect(result.body.message).toEqual(expect.any(String));
    });

    it('Request /employees/:employeeId (DELETE). It should delete a employee data', async () => {
        const result = await request(app).delete('/employees/19').send();

        expect(result.status).toBe(200);
        expect(result.body.success).toEqual(true);
        expect(result.body.data).toEqual({});
        expect(result.body.message).toEqual(expect.any(String));
    });
});
