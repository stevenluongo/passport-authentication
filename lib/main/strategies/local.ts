import crypto from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserRepository } from '../../infra/db/mongodb/repositories/UserRepository';

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

export function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex');
  return user.hash === inputHash;
}
