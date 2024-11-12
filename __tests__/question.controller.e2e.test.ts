import 'reflect-metadata';
import request from 'supertest';
import app from '../src/app';
import { CONFIG } from '../src/config/environment.config';

describe('E2E Test for /api/questions', () => {
  it('should return transformed questions with correct structure', async () => {
    const response = await request(app).get('/api/questions');

    // Verifica el código de estado
    expect(response.status).toBe(200);

    // Verifica la estructura de la respuesta
    expect(response.body).toHaveProperty('titulo');
    expect(typeof response.body.titulo).toBe('string');

    expect(response.body).toHaveProperty('dia');
    expect(typeof response.body.dia).toBe('string');
    // Validación de formato de fecha (DD-MM-YYYY)
    expect(response.body.dia).toMatch(/^(\d{4})-(\d{1,2})-\d{1,2}$/);

    expect(response.body).toHaveProperty('info');
    expect(Array.isArray(response.body.info)).toBe(true);

    expect(response.body).toHaveProperty('api_version');
    expect(response.body.api_version).toBe(1);

    // Verifica la estructura de cada pregunta en `info`
    response.body.info.forEach((question: any) => {
      expect(question).toHaveProperty('pregunta_id');
      expect(typeof question.pregunta_id).toBe('number');

      expect(question).toHaveProperty('pregunta');
      expect(typeof question.pregunta).toBe('string');
    });
  });

  it('should handle errors from the external API gracefully', async () => {
    // Guardamos el valor actual de la URL para restaurarlo después de la prueba
    const originalApiUrl = CONFIG.API.URL;
    const originalUseMock = CONFIG.CUSTOM.USE_MOCK;
    // Cambiamos la URL a una incorrecta para simular un error
    CONFIG.API.URL = 'https://invalid-url.com';
    CONFIG.CUSTOM.USE_MOCK = false;

    const response = await request(app).get('/api/questions');

    console.log(response.body);

    // Verifica el código de estado de error
    expect(response.status).toBe(500);

    // Verifica el mensaje de error esperado
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Error fetching data from external API');

    // Restauramos el valor original de la URL
    CONFIG.API.URL = originalApiUrl;
    CONFIG.CUSTOM.USE_MOCK = originalUseMock;
  });
});
