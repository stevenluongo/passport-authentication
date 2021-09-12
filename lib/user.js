import crypto from 'crypto'
import User from "../models/User";
import connectDB from '../utils/connectDB';

connectDB();

export async function createUser(username, password) {
    return new Promise(async(resolve, reject) => {
        //check for duplicate username
        const duplicateUser = await findUser(username)
        if(duplicateUser) {
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
    })
}

// // Here you should lookup for the user in your DB
export async function findUser(username) {
    return new Promise(async(resolve) => {
        const user = await User.findOne({username});
        resolve(user);
    })
}

export function findUserById(id) {
    return new Promise(async(resolve) => {
        const user = await User.findOne({id})
        resolve(user);
    })
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