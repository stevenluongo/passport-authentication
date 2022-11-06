import nc from 'next-connect';
import { makeSessionController } from "../../../lib/main/factories/controllers/auth/makeSessionController";

const handler = nc();

handler.get(makeSessionController);

export default handler;


