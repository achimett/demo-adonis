import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Employees extends BaseSchema {
  protected tableName = 'employees';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table //prettifier-ignore
        .integer('department_id')
        .unsigned()
        .references('departments.id');
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
