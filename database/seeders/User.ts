import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import User from 'App/Models/User';

export default class UserSeeder extends BaseSeeder {
  public static developmentOnly = true;

  public async run() {
    await User.createMany([
      {
        email: 'user1@email.com',
        password: 'abcd',
      },
      {
        email: 'user2@email.com',
        password: '1234',
      },
    ]);
  }
}
