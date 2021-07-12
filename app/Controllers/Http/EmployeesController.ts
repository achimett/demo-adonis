import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Employee from 'App/Models/Employee';

export default class EmployeesController {
  public async all({}: HttpContextContract) {
    return await Employee.all();
  }

  public async one({ params }: HttpContextContract) {
    return await Employee.findBy('id', params.id);
  }

  public async newEmployee({ request, response }: HttpContextContract) {
    const employee: Employee = new Employee();
    employee.firstName = request.input('firstName');
    employee.lastName = request.input('lastName');
    employee.departmentId = request.input('departmentId');
    return response.created(await employee.save());
  }

  public async replaceEmployee({ request, response, params }: HttpContextContract) {
    const employee = await Employee.findBy('id', params.id);
    employee!.firstName = request.input('firstName');
    employee!.lastName = request.input('lastName');
    employee!.departmentId = request.input('departmentId');
    return response.ok(await employee?.save());
  }

  public async deleteEmployee({ response, params }: HttpContextContract) {
    const employee = await Employee.findBy('id', params.id);
    await employee!.delete();
    return response.noContent();
  }
}
