import crypto from 'crypto'
import User from "../models/User";
import connectDB from '../utils/connectDB';

connectDB();

export async function createUser(username, password) {
    return new Promise(async(resolve) => {
        //check for duplicate username
        const duplicateUser = await findUser(username)
        if(duplicateUser) resolve({msg: "Username already taken"})
        
        //generate salt & hash
        const salt = crypto.randomBytes(16).toString('hex')
        const hash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
        .toString('hex')

        //create & save user
        try {
            const newUser = new User({salt, hash, username});
            await newUser.save();
            resolve({msg: "user successfully created"})
        } catch (err) {
            resolve(err);
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

// // Compare the password of an already fetched user (using `findUser`) and compare the
// // password for a potential match
// export function validatePassword(user, inputPassword) {
//   const inputHash = crypto
//     .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
//     .toString('hex')
//   const passwordsMatch = user.hash === inputHash
//   return passwordsMatch
// }