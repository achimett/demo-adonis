import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Department from 'App/Models/Department';

export default class DepartmentsController {
  public async all({}: HttpContextContract) {
    return await Department.all();
  }

  public async one({ params }: HttpContextContract) {
    return await Department.findBy('id', params.id);
  }

  public async newDepartment({ request, response }: HttpContextContract) {
    const department: Department = new Department();
    department.name = request.body().name;
    return response.created(await department.save());
  }

  public async replaceDepartment({ request, response, params }: HttpContextContract) {
    const department = await Department.findBy('id', params.id);
    department!.name = request.body().name;
    return response.ok(await department?.save());
  }

  public async deleteDepartment({ response, params }: HttpContextContract) {
    const department = await Department.findBy('id', params.id);
    await department!.delete();
    return response.noContent();
  }
}
