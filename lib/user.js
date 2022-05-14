import { MongoServerError, ObjectId } from "mongodb";
import { validateEmail, generateHash, toArray } from './helpers';
import { connectToDatabase, createDefaultCollection } from "../utils/mongodb";

export const createLocalUser = async(payload) => {
    const { db } = await connectToDatabase(); //establish database connection

    const collections = await toArray(db.listCollections()); //ensure a collection exists
    if(!collections.length) await createDefaultCollection(db, 'users');

    const isValid = validateLocalUserParameters(payload); //validate request payload

    const { password, email_address, username } = payload;

    const { salt, hash } = generateHash(password); //generate hash & salt

    const body = { created_at: new Date(), hash, salt, username, email_address } //format body

    try {
        if(isValid) await db.collection('users').insertOne(body); //insert user into db
        return { message: "User successfully created!" }
    } catch (err) {
        //schema validation error
        if (err instanceof MongoServerError && err.code === 121) {
            const err_response = err.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0];
            const result = { 
                property: err_response.propertyName,
                message: "Mongo Schema Validation Error",
                details: err_response.details[0],
            }
            return result;
        }
        //all other errors
        else throw new Error(err);
    }
}
                    
export const createGithubUser = async(payload) => {
    const { db } = await connectToDatabase(); //establish database connection

    const collections = await toArray(db.listCollections()); //ensure a collection exists
    if(!collections.length) await createDefaultCollection(db, 'users');

    const isValid = validateGithubUserParameters(payload);

    try {
        if(isValid) await db.collection('users').insertOne(payload); //insert user into db
        return { success: true, message: "User successfully created!" }
    } catch (err) {
        //schema validation error
        if (err instanceof MongoServerError && err.code === 121) {
            const err_response = err.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0];
            const result = { 
                property: err_response.propertyName,
                message: "Mongo Schema Validation Error",
                details: err_response.details[0],
            }
            return result;
        }
        //all other errors
        else throw new Error(err);
    }
}

export const fetchUserByQuery = async(query) => {
    const { db } = await connectToDatabase(); //establish database connection

    try {
        const result = await db.collection("users").find({...query}).toArray();
        return result[0];
    } catch (err) {
        throw new Error(err);
    }
}


export const fetchUserById = async(identifier) => {
    const { db } = await connectToDatabase(); //establish database connection

    try {
        const result = await db.collection("users").find({_id: new ObjectId(identifier)}).toArray();
        return result[0];
    } catch (err) {
        throw new Error(err);
    }
}

const validateLocalUserParameters = ({username, password, email_address}) => {
    //ensure all fields are satisfied
    if(!username) throw new Error("Please provide a username.");
    if(!email_address) throw new Error("Please provide an email address.");
    if(!password) throw new Error("Please provide a password.");
    
    //ensure valid email address
    if(!validateEmail(email_address)) throw new Error("Must be a valid email address.");

    return true;
}

const validateGithubUserParameters = ({username, github_id}) => {
    //ensure all fields are satisfied
    if(!username) throw new Error({status: 500, message: "Please provide a username."});
    if(!github_id) throw new Error({status: 500, message: "Please provide a github identifier."});

    return true;
}