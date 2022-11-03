import passport from 'passport';
import { localStrategy } from '../../strategies/local';

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
