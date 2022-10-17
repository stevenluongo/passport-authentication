import nextConnect from 'next-connect';
import { nextRouteAdapter } from '../../../lib/main/adapters/nextRouteAdapter';
import { makeCreatePostsController } from '../../../lib/main/factories/controllers/makeCreatePostsController';

const handler = nextConnect();

handler.get(nextRouteAdapter(makeCreatePostsController()));

export default handler;
