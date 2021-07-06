import test from 'japa';
import supertest from 'supertest';

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`;

test.group('Employees Integration Tests', () => {
  test('ensure the employees list is available', async () => {
    const { text } = await supertest(BASE_URL).get('/employees').expect(200);

    const response = JSON.parse(text);

    console.log(response);
  });
});
