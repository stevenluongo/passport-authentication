import { NextApiRequest, NextApiResponse } from 'next';
import passport from 'passport';
import { setLoginSession } from "../lib/auth";
import { localStrategy } from './strategies/local';

passport.use(localStrategy);

const authenticate = (req: NextApiRequest, res: NextApiResponse) =>
  new Promise((resolve, reject) => {
    passport.authenticate('local', { session: false }, (error, token) => {
      if (error) reject(error);
      else resolve(token);
    })(req, res);
});

type userType = {
    _id?: string,
    emailAddress?: string,
    username?: string,
    createdAt?: Date
  }
  
  type NextRouteApiRequest = NextApiRequest & {
    user: userType
  };

// export middleware to wrap api/auth handlers
const handler = (fn) => async(req: NextRouteApiRequest, res : NextApiResponse) => {
    //authenticate user using passport
    try {
      const user : userType = await authenticate(req, res);
      //create session with user
      const session = { ...user };
  
      //generate cookie
      const cookie = await setLoginSession(session);
  
      //set cookie
      res.setHeader('Set-cookie', cookie);
  
      //update request object to include user
      req.user = user
      
      // call wrapped api route as innermost handler
      return await fn(req, res);
    } catch (e) {
      res.status(500).json({ message: e.message, success: false });
      return;
    }
};

export default handler;
