import crypto from 'crypto'
import User from "../models/User";
import connectDB from '../utils/connectDB';

const DUPLICATE_EMAIL_RESPONSE = { msgError: true, msgBody: "Email address already in use..." };
const DUPLICATE_USERNAME_RESPONSE = { msgError: true, msgBody: "Username already taken..." };
const ACCOUNT_CREATED_RESPONSE = { msgError: false, msgBody: "Account successfully created!" }
const DB_ERROR_RESPONSE = {msgError: true, msgBody: "Something went wrong ..."};
const INVALID_EMAIL_RESPONSE = {msgError: true, msgBody: "Must enter a valid email address"};

connectDB();

export const createUser = ({email, username, password}) => new Promise(async(resolve) => {
    const duplicateEmail = await findUser({email})
    const duplicateUsername = await findUser({username});
    const isValidEmail = validateEmail(email);

    //check for invalid email
    if(!isValidEmail) {
        resolve(INVALID_EMAIL_RESPONSE);
        return;
    }

    //check for dupe username / email
    if(duplicateEmail || duplicateUsername) {
        duplicateEmail && resolve(DUPLICATE_EMAIL_RESPONSE)
        duplicateUsername && resolve(DUPLICATE_USERNAME_RESPONSE)
        return;
    }

    //generate salt & hash
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')

    //create & save user
    try {
        const newUser = new User({salt, hash, username, email});
        await newUser.save();
        resolve(ACCOUNT_CREATED_RESPONSE)
    } catch (err) {
        reject(DB_ERROR_RESPONSE)
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
export const findUser = async(target) => {
    const user = await User.findOne(target);
    return user;
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex')
  const passwordsMatch = user.hash === inputHash
  return passwordsMatch
}


export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}