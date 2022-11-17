import { UserRepository } from '@infra/db/mongodb/repositories/UserRepository';
import { validatePassword } from '@main/helpers/validatePassword';
import { NextApiRequest, NextApiResponse } from 'next';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

export const localStrategy = new LocalStrategy(async function (
  username,
  password,
  cb
) {
  try {
    const userRepository = new UserRepository();
    const user = (await userRepository.fetchLoginUser({ username }))[0];
    if (user && validatePassword(user, password)) {
      const { hash, salt, ...body } = user;
      cb(null, { ...body });
    } else cb(new Error('Invalid username and password combination'));
  } catch (err) {
    cb(err);
  }
});

export const authenticate = (req: NextApiRequest, res: NextApiResponse) =>
  new Promise((resolve, reject) => {
    passport.authenticate('local', { session: false }, (error, token) => {
      if (error) {
        reject(error);
      } else resolve(token);
    })(req, res);
  });
