import nc from "next-connect";
import { makeLoginSessionController } from "../../../lib/main/factories/controllers/auth/makeLoginSessionController";
import { localMiddleware } from "../../../lib/main/middleware/passportLocal";

const handler = nc().use(localMiddleware).post(makeLoginSessionController);

export default handler;
