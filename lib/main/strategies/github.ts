import { Strategy as GithubStrategy } from 'passport-github';

export const githubStrategy = new GithubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, cb) => {
    // //look for existing user
    // const userRepo = new UserRepository();
    // const existingUser = await userRepo.fetchUserByQuery({ github_id: profile.id });
    // if (existingUser) return cb(null, existingUser);

    // //create new user
    // const { username, id } = profile;
    // const { success } = await userRepo.createUser({ github_id: id, username });
    // if (success) {
    //   //fetch newly created user
    //   const user = await userRepo.fetchUserByQuery({ github_id: id });
    //   const { _id, username, github_id } = user;
    //   cb(null, { _id, username, github_id });
    // }
  }
);
