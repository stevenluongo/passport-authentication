import nextConnect from 'next-connect';
import passport from 'passport';
import withPassport from '../../../../lib/main/middleware/withPassport';
import { githubStrategy } from '../../../../lib/strategies/github';

passport.use(githubStrategy);

const handler = nextConnect()
  .use(passport.initialize())
  .get(async (req, res) => {
    try {
      passport.authenticate('github')(req, res, (..._args) => {});
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

export default withPassport(handler);
