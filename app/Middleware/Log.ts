import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class Log {
  public async handle({ logger, request }: HttpContextContract, next: () => Promise<void>) {
    logger.info(
      request.url() + ' received a ' + request.method() + ' request from ' + request.hostname()
    );

    await next();
  }
}
