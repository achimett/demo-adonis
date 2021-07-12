import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UsersController {
  public async login({ auth, request, response }: HttpContextContract) {
    const email: string = request.input('email');
    const password: string = request.input('password');

    try {
      return await auth.use('api').attempt(email, password, {
        expiresIn: '30mins', // Redis *automatically* deletes token when expired
      }); // Returns an OpaqueTokenContract<User>
    } catch {
      return response.badRequest('Invalid credentials');
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke();

    return { revoked: true };
  }
}
