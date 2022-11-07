import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import passport from 'passport';
import { setLoginSession } from '../../../../lib/main/helpers/session';
import { githubMiddleware } from '../../../../lib/main/middleware/passportGithub';

const authenticate = (req: NextApiRequest, res: NextApiResponse) =>
  new Promise((resolve, reject) => {
    passport.authenticate('github', { session: false }, (error, token) => {
      if (error) reject(error);
      else resolve(token);
    })(req, res);
  });

const handler = nextConnect()
  .use(githubMiddleware)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const user: Object = await authenticate(req, res);
      const session = { ...user };
      const cookie = await setLoginSession(session);
      res.setHeader('Set-Cookie', cookie);
      res.redirect('/');
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

export default handler;
