import nextConnect from 'next-connect';
import { nextRouteAdapter } from '../../../../lib/main/adapters/nextRouteAdapter';
import { makeCreateUserController } from '../../../../lib/main/factories/controllers/user/makeCreateUserController';

const handler = nextConnect();

handler.post(nextRouteAdapter(makeCreateUserController()));

export default handler;
