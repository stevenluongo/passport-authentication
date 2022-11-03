import nc from 'next-connect';
import { makeLogoutController } from '../../../lib/main/factories/controllers/auth/makeLogoutController';

const handler = nc();

handler.get(makeLogoutController);

export default handler;
