import nextConnect from "next-connect";
import passport from "passport";
import { nextRouteAdapter } from "../../lib/main/adapters/nextRouteAdapter";
import { makeLoginSessionController } from "../../lib/main/factories/controllers/auth/makeLoginSessionController";
import withTest from "../../lib/withTest";

const handler = nextConnect();

handler
  .use(passport.initialize())
  .post(nextRouteAdapter(makeLoginSessionController()));

export default withTest(handler);
