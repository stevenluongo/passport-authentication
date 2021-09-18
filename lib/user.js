import crypto from 'crypto'
import User from "../models/User";
import connectDB from '../utils/connectDB';

connectDB();

export const createUser = (username, password) => new Promise(async(resolve) => {
    const existingUser = await findUser({username})
    if(existingUser) {
        resolve({ msgError: true, msgBody: "Username already taken ..." })
        return;
    }

    //generate salt & hash
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')

    //create & save user
    try {
        const newUser = new User({salt, hash, username});
        await newUser.save();
        resolve({ msgError: false, msgBody: "Account successfully created!" })
    } catch (error) {
        reject({msgError: true, msgBody: "Something went wrong ...", error: error})
    }
});

export const createGithubUser = (username, githubId) => new Promise(async(resolve) => {
    try {
        const newUser = new User({username, githubId});
        await newUser.save();
        resolve(newUser)
    } catch (error) {
        reject({msgError: true, msgBody: "Something went wrong ...", error: error})
    }
})

//find user
export const findUser = (target) => new Promise(async(resolve) => {
    const user = await User.findOne(target);
    resolve(user);
})

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex')
  const passwordsMatch = user.hash === inputHash
  return passwordsMatch
}