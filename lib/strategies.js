import {Strategy as LocalStrategy} from 'passport-local'
import {Strategy as GithubStrategy} from "passport-github";
import { findUser, validatePassword } from './user'
import Users from "../models/User";
import connectDB from '../utils/connectDB';

export const localStrategy = new LocalStrategy(async function (username, password, cb) {
    try {
        const user = await findUser(username);
        if(user && validatePassword(user, password)) cb(null, user);
        else cb(new Error("Invalid username and password combination"));
    } catch(err) {
        cb(err)
    }
})

export const githubStrategy = new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  }, async(accessToken, refreshToken, profile, cb) => {
    connectDB();
    const oldUser = await Users.findOne({githubId: profile.id});
    if(oldUser) {
      return cb(null, oldUser);
    }
    const newUser = await new Users({
      username: profile.displayName,
      githubId: profile.id
    }).save();
    cb(null, newUser)
})