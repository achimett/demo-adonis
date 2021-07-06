import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Employee from 'App/Models/Employee';
import Department from 'App/Models/Department';

export default class EmployeeSeeder extends BaseSeeder {
  public static developmentOnly = true;

  // Seeding using .save() method
  public async run() {
    const bilbo: Employee = new Employee();
    bilbo.firstName = 'Bilbo';
    bilbo.lastName = 'Baggins';
    await bilbo.save();

    const sales = await Department.findBy('name', 'Sales');
    await sales!.related('employees').save(bilbo);

    const frodo: Employee = new Employee();
    frodo.firstName = 'Frodo';
    frodo.lastName = 'Baggins';
    await frodo.save();

    const production = await Department.findBy('name', 'Production');
    await production!.related('employees').save(frodo);
  }
}
