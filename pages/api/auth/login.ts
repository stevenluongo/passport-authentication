import nc from 'next-connect';
import { makeLoginController } from '../../../lib/main/factories/controllers/auth/makeLoginController';
import { localMiddleware } from '../../../lib/main/middleware/passportLocal';

const handler = nc();

handler.use(localMiddleware).post(makeLoginController);

export default handler;
