import test from 'japa';
import supertest from 'supertest';
import Employee from 'App/Models/Employee';
import User from 'App/Models/User';
import { expect } from 'chai';

const BASE_URL: string = `http://${process.env.HOST}:${process.env.PORT}`;

test.group('Employees Integration Tests', () => {
  test('ensure the employees list is available', async () => {
    const { text } = await supertest(BASE_URL).get('/employees').expect(200);

    const response = JSON.parse(text);

    console.log(response);
  });

  test('ensure the it is possible to change employee department after login', async () => {
    let employee: Employee = new Employee();
    employee.firstName = 'john';
    employee.lastName = 'doe';
    employee.departmentId = 1;
    employee = await employee.save();

    let decodedUserPassword: string = 'verySecretPwd';

    let user: User = new User();
    user.email = 'admin@email.com';
    user.password = decodedUserPassword;
    user = await user.save();

    let loginResponseRaw = await supertest(BASE_URL)
      .post('/login')
      .set('Content-Type', 'application/json')
      .send({
        email: user.email,
        password: decodedUserPassword,
      });

    let loginResponse: any = JSON.parse(loginResponseRaw.text);

    let putResponseRaw = await supertest(BASE_URL)
      .put('/employees/' + employee.id)
      .set('Authorization', 'Bearer ' + loginResponse.token)
      .set('Content-Type', 'application/json')
      .send({ departmentId: 2 });

    let putResponse: any = JSON.parse(putResponseRaw.text);

    expect(putResponse.id).to.equal(employee.id);
    expect(putResponse.department_id).to.equal(2);

    await supertest(BASE_URL).post('/logout').expect(200);

    await employee.delete();
    await user.delete();
  });
});
