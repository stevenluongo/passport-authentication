import { MongoServerError, ObjectId } from "mongodb";
import { connectToDatabase, createDefaultCollection } from "../utils/mongodb";
import { toArray } from "./helpers";

export const createLocalUser = async (_payload) => {};

export const createGithubUser = async (payload) => {
  const { db } = await connectToDatabase(); //establish database connection

  const collections = await toArray(db.listCollections()); //ensure a collection exists
  if (!collections.length) await createDefaultCollection(db, "users");

  const isValid = validateGithubUserParameters(payload);

  try {
    if (isValid) await db.collection("users").insertOne(payload); //insert user into db
    return { success: true, message: "User successfully created!" };
  } catch (err) {
    //schema validation error
    if (err instanceof MongoServerError && err.code === 121) {
      const err_response =
        err.errInfo.details.schemaRulesNotSatisfied[0]
          .propertiesNotSatisfied[0];
      const result = {
        property: err_response.propertyName,
        message: "Mongo Schema Validation Error",
        details: err_response.details[0],
      };
      return result;
    }
    //all other errors
    else throw new Error(err);
  }
};

export const updateUser = async (_id, payload) => {
  if (!_id) throw new Error("Please provide a user _id"); //ensure id is provided
  const { db } = await connectToDatabase(); //establish database connection

  try {
    const target = { _id: new ObjectId(_id) };
    const { acknowledged, matchedCount, modifiedCount } = await db
      .collection("users")
      .updateOne(target, { $set: payload }); //update user
    if (acknowledged && matchedCount >= 1 && modifiedCount >= 1)
      return { message: "User successfully updated!" }; //case user updated
    else if (acknowledged && matchedCount >= 1 && modifiedCount < 1)
      throw new Error("Nothing was updated."); //case user found but not updated
    else if (acknowledged && matchedCount < 1)
      throw new Error("Could not find a matching user with that _id");
    //case no user found
    else throw new Error("something went wrong..."); //default case
  } catch (err) {
    throw new Error(err);
  }
};

export const removeUser = async (_id) => {
  if (!_id) throw new Error("Please provide a user _id"); //ensure id is provided
  const { db } = await connectToDatabase(); //establish database connection

  try {
    const result = await db
      .collection("users")
      .deleteOne({ _id: new ObjectId(_id) }); //remove user
    if (result.acknowledged && result.deletedCount > 0)
      return {
        message: "User successfully removed from the database.",
      };
    //case user removed
    else throw new Error("Could not find a matching user with that _id"); //default case no user
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchUserByQuery = async (query) => {
  const { db } = await connectToDatabase(); //establish database connection

  try {
    const result = await db
      .collection("users")
      .find({ ...query })
      .toArray();
    return result[0];
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchUserById = async (identifier) => {
  const { db } = await connectToDatabase(); //establish database connection

  try {
    const result = await db
      .collection("users")
      .find({ _id: new ObjectId(identifier) })
      .toArray();
    return result[0];
  } catch (err) {
    throw new Error(err);
  }
};

// const _validateLocalUserParameters = ({ username, password, email_address }) => {
//   //ensure all fields are satisfied
//   if (!username) throw new Error('Please provide a username.');
//   if (!email_address) throw new Error('Please provide an email address.');
//   if (!password) throw new Error('Please provide a password.');

//   //ensure valid email address
//   if (!validateEmail(email_address))
//     throw new Error('Must be a valid email address.');

//   return true;
// };

const validateGithubUserParameters = ({ username, github_id }) => {
  //ensure all fields are satisfied
  if (!username)
    throw new Error({ status: 500, message: "Please provide a username." });
  if (!github_id)
    throw new Error({
      status: 500,
      message: "Please provide a github identifier.",
    });

  return true;
};
