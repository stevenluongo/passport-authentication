import { connectToDatabase } from '@infra/db/mongodb/helpers/database.service';
import { UserRepository } from '@infra/db/mongodb/repositories/UserRepository';
import { Strategy as GithubStrategy } from 'passport-github';

export const githubStrategy = new GithubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, cb) => {
    // return cb(null, profile);
    await connectToDatabase();
    const userRepo = new UserRepository();

    const { username, id: githubId } = profile;
    const existingUser = await userRepo.fetchUserByQuery({ githubId });
    if (existingUser[0]) return cb(null, existingUser[0]);
    const user = await userRepo.createUser({ username, githubId });
    cb(null, user);
  }
);
