import { connectToDatabase } from '../../utils/mongodb';

export default async function userInterface() {
  const { db } = await connectToDatabase(); //establish database connection

  async function createUserPersistence(payload: {
    username: string;
    email_address: string;
    hash: string;
    salt: string;
  }) {
    const response = await db.collection('users').find({}).toArray();
    console.log(response);
  }
  return Object.freeze({
    createUserPersistence,
  });
}
