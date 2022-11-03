import nextConnect from 'next-connect';
import { nextRouteAdapter } from '../../../../lib/main/adapters/nextRouteAdapter';
import { makeDeleteUserController } from '../../../../lib/main/factories/controllers/user/makeDeleteUserController';
import { makeFetchUserByIdController } from '../../../../lib/main/factories/controllers/user/makeFetchUserByIdController';
import { makeUpdateUserController } from '../../../../lib/main/factories/controllers/user/makeUpdateUserController';

const handler = nextConnect();

//fetch user by id
handler.post(nextRouteAdapter(makeFetchUserByIdController()));

//update user
handler.put(nextRouteAdapter(makeUpdateUserController()));

//delete user
handler.delete(nextRouteAdapter(makeDeleteUserController()));

export default handler;
