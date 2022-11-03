import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GithubStrategy } from 'passport-github';
import { createGithubUser, fetchUserByQuery } from './user';
import { validatePassword } from './helpers';

export const localStrategy = new LocalStrategy(async function (
  username,
  password,
  cb
) {
  try {
    const user = await fetchUserByQuery({ username });
    if (user && validatePassword(user, password)) {
      const { username, _id, email_address, created_at } = user;
      cb(null, { username, _id, email_address, created_at });
    } else cb(new Error('Invalid username and password combination'));
  } catch (err) {
    cb(err);
  }
});

export const githubStrategy = new GithubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, cb) => {
    //look for existing user
    const existingUser = await fetchUserByQuery({ github_id: profile.id });
    if (existingUser) return cb(null, existingUser);

    //create new user
    const { username, id } = profile;
    const { success } = await createGithubUser({ github_id: id, username });
    if (success) {
      //fetch newly created user
      const user = await fetchUserByQuery({ github_id: id });
      const { _id, username, github_id } = user;
      cb(null, { _id, username, github_id });
    }
  }
);
