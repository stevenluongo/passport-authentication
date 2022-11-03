import { NextApiRequest, NextApiResponse } from 'next';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { validatePassword } from '../helpers';
import { fetchUserByQuery } from '../user';

export const localStrategy = new LocalStrategy(async function (
  username,
  password,
  cb
) {
  try {
    const user = await fetchUserByQuery({ username });
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
        console.log(error);
        reject(error);
      } else resolve(token);
    })(req, res);
  });
