import request from 'supertest';

import app from '../app';
let authToken: string;

describe('Testing Task Endpoints', () => {
  /* it('Should return 200', async () => {
    await request(app)
      .get('/api/task/61cf2e4f2461283a41af6918')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
  }); */

  it('Should GET /tasks successfully', async () => {
    const { body } = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${authToken}`);

    expect(body).toHaveLength(10);
  });

  beforeAll(async () => {
    const { body } = await request(app)
      .post('/api/login')
      .send({ email: 'test@test.com', password: '123456' })
      .set('Accept', 'application/json')

    expect(body).toHaveProperty('token');
    authToken = body.token;
  });
});
