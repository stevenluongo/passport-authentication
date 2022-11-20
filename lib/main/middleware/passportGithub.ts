import { UserRepository } from '@infra/db/mongodb/repositories/UserRepository';
import { githubStrategy } from '@main/strategies/github';
import passport from 'passport';

export const githubMiddleware = async (req, res, next) => {
  //initialize passport session
  passport.initialize();

  //use the github strategy
  passport.use(githubStrategy);

  //add serialize method
  passport.serializeUser(({ id }, done) => done(null, { id }));

  //add deserialize method
  passport.deserializeUser(async (id, done) => {
    const userRepo = new UserRepository();
    const user = await userRepo.fetchUserById(id);
    done(null, user);
  });

  //continue
  return next();
};
