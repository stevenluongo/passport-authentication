import {Strategy as LocalStrategy} from 'passport-local'
import { findUser, validatePassword } from './user'

export const localStrategy = new LocalStrategy(async function (username, password, cb) {
    try {
        const user = await findUser(username);
        if(user && validatePassword(user, password)) cb(null, user);
        else cb(new Error("Invalid username and password combination"));
    } catch(err) {
        cb(err)
    }
})