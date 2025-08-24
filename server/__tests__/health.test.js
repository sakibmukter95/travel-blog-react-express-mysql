const request = require('supertest');
const app = require('../index');

describe('Health Check Endpoint', () => {
  test('GET /health should return 200 and status OK', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);

    expect(response.body).toHaveProperty('status', 'OK');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('uptime');
  });
});
