import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import passport from 'passport';
import { githubMiddleware } from '../../../lib/main/middleware/passportGithub';

const handler = nextConnect()
    .use(githubMiddleware)
    .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        passport.authenticate('github')(req, res, (...args) => {
        });
    } catch (err) {
      console.log(err)
        res.status(500).json({ success: false, message: err.message });
    }
})

export default handler;
