import test from 'japa';
import { expect } from 'chai';
import Employee from 'App/Models/Employee';
import Department from 'App/Models/Department';

test.group('Employees Integration Tests', (group) => {
  let john: Employee;
  let logistics: Department;

  group.before(async () => {
    const employee: Employee = new Employee();
    employee.firstName = 'john';
    employee.lastName = 'doe';
    john = await employee.save();

    const department: Department = new Department();
    department.name = 'Logistics';
    logistics = await department.save();
  });

  group.after(async () => {
    await john.delete();
  });

  test('ensure employees are in an existing department else error thrown', async () => {
    let result: Employee;
    let error = null;

    john.departmentId = logistics.id;
    result = await john.save();
    expect(result).to.be.not.null;

    john.departmentId = Number.MAX_SAFE_INTEGER;

    try {
      await john.save();
    } catch (e) {
      error = e;
    }

    expect(error).to.be.not.null;
  });
});
