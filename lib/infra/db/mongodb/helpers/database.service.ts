import * as mongoDB from 'mongodb';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { users: null };
}

export const collections: { users?: mongoDB.Collection } = {};

export async function connectToDatabase() {
  if (cached.collections) {
    collections.users = cached.collections.users;
    return;
  }
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.MONGODB_URI
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const gamesCollection: mongoDB.Collection = db.collection('users');

  collections.users = gamesCollection;

  cached.collections = collections;
}
