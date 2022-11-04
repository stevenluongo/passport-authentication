import nextConnect from 'next-connect';
import { nextRouteAdapter } from '../../../../lib/main/adapters/nextRouteAdapter';
import { makeCreateUserController } from '../../../../lib/main/factories/controllers/user/makeCreateUserController';
import {
    makeFetchUserByQueryController
} from "../../../../lib/main/factories/controllers/user/makeFetchUserByQueryController";

const handler = nextConnect();

//create new user
handler.post(nextRouteAdapter(makeCreateUserController()));

//fetch user by query
handler.put(nextRouteAdapter(makeFetchUserByQueryController()));

export default handler;
