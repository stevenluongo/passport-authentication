import nextConnect from 'next-connect';
import { nextRouteAdapter } from '@main/adapters/nextRouteAdapter';
import { makeCreateUserController } from '@main/factories/controllers/user/makeCreateUserController';
import {
    makeFetchUserByQueryController
} from "@main/factories/controllers/user/makeFetchUserByQueryController";

const handler = nextConnect();

//create new user
handler.post(nextRouteAdapter(makeCreateUserController()));

//fetch user by query
handler.put(nextRouteAdapter(makeFetchUserByQueryController()));

export default handler;
