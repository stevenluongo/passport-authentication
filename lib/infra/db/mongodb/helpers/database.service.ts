import * as mongoDB from 'mongodb';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { users: null, verification: null };
}

export const collections: {
  users?: mongoDB.Collection;
  verification?: mongoDB.Collection;
} = {};

export async function disconnectFromDatabase() {
  cached.client?.close();
  cached.collections = null;
  cached.client = null;

  //clear collections
  collections.users = null;
  collections.verification = null;
}

export async function connectToDatabase() {
  if (cached.collections) {
    collections.users = cached.collections.users;
    collections.verification = cached.collections.verification;
    return;
  }
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.MONGODB_URI
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const usersColl: mongoDB.Collection = db.collection(
    process.env.USERS_COLLECTION_NAME
  );

  const verificationColl: mongoDB.Collection = db.collection(
    process.env.VERIFICATION_COLLECTION_NAME
  );

  //set collections
  collections.users = usersColl;
  collections.verification = verificationColl;

  //set cache
  cached.collections = collections;
  cached.client = client;
}
