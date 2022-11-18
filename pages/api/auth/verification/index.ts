import { nextRouteAdapter } from '@main/adapters/nextRouteAdapter';
import { makeCreateVerificationSessionController } from '@main/factories/controllers/verification/makeCreateVerificationSessionController';
import { makeFetchVerificationSessionByQueryController } from '@main/factories/controllers/verification/makeFetchVerificationSessionByQueryController';
import nextConnect from 'next-connect';

const handler = nextConnect();

//create new verification session
handler.post(nextRouteAdapter(makeCreateVerificationSessionController()));

//fetch verification session by query
handler.put(nextRouteAdapter(makeFetchVerificationSessionByQueryController()));

export default handler;
