import { localStrategy } from '@main/strategies/local';
import passport from 'passport';

export const localMiddleware = (req, res, next) => {
  if (!req.body.username) {
    res.status(401).json({ message: 'Missing param: username' });
    return;
  }
  if (!req.body.password) {
    res.status(401).json({ message: 'Missing param: password' });
    return;
  }
  passport.initialize();
  passport.use(localStrategy);
  return next();
};
