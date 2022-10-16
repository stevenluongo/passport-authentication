import nextConnect from 'next-connect';
import { nextRouteAdapter } from '../../../lib/adapters/nextRouteAdapter';
import { PostsController } from '../../../lib/controllers/postsController';

const handler = nextConnect();

handler.get(nextRouteAdapter(PostsController()));

export default handler;
