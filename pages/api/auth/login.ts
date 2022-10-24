import nc from "next-connect";
import passport from 'passport';
import { nextRouteAdapter } from "../../../lib/main/adapters/nextRouteAdapter";
import { makeLoginSessionController } from "../../../lib/main/factories/controllers/auth/makeLoginSessionController";
import authenticate from "../../../lib/main/middleware/authenticate";

const handler = nc()
  .use(passport.initialize())
  .post(nextRouteAdapter(makeLoginSessionController()));

export default authenticate(handler);