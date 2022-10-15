import { generateHash } from '../helpers';
import userInterface from '../interfaces/userInterface';

export default async function userInteractor() {
  const { createUserPersistence } = await userInterface();
  async function createUser(
    password: string,
    username: string,
    email_address: string
  ) {
    const { salt, hash } = generateHash(password);
    const payload = { username, email_address, salt, hash };
    const newUser = await createUserPersistence(payload);
    console.log('create');
  }
  return Object.freeze({
    createUser,
  });
}
