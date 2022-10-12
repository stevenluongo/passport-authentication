import { connectToDatabase } from '../../utils/mongodb';

export default async function userCollection() {
  const { db } = await connectToDatabase();
  return db.collection('users');
}
