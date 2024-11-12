import request from 'supertest';
import app from '../src/app';

describe('E2E Test for /api/questions', () => {
  it('should return transformed questions with correct structure', async () => {
    const response = await request(app).get('/api/questions');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('titulo');
    expect(response.body).toHaveProperty('dia');
    expect(response.body).toHaveProperty('info');
    expect(response.body).toHaveProperty('api_version');
  });

  it('should handle errors from the external API gracefully', async () => {
    // Modify the endpoint temporarily to test error handling
    process.env.API_URL = 'https://invalid-url.com';
    const response = await request(app).get('/api/questions');
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
  });
});
