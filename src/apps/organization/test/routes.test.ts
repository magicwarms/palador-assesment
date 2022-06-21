import app from '../../../index';
import request from 'supertest';

describe('Router test', () => {
    it(`Request /hello should return Hello ${process.env.APP_NAME}`, async () => {
        const result = await request(app).get('/hello').send();

        expect(result.status).toBe(200);
        expect(result.body.success).toEqual(true);
        expect(result.body.data).toEqual({});
        expect(result.body.message).toEqual('Hello Palador - Andhana Utama');
    });

    it('Request /randomurl should return 404!', async () => {
        const result = await request(app).get('/randomurl').send();

        expect(result.status).toBe(404);
        expect(result.body.success).toEqual(true);
        expect(result.body.data).toEqual({});
        expect(result.body.message).toEqual('API route not found');
    });

    it('Request /boom should return 500!', async () => {
        const result = await request(app).get('/boom').send();

        expect(result.status).toBe(500);
        expect(result.body.success).toEqual(false);
        expect(result.body.data).toEqual({});
        expect(result.body.message).toEqual(expect.any(String));
    });
});
