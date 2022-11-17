import { CreateUserInterface } from '@application/interfaces/use-cases/user/createUserInterface';
import { FetchUserById } from '@application/use-cases/user/fetchUserById';
import { UserRepository } from '@infra/db/mongodb/repositories/UserRepository';

export const makeFetchUserById = (): CreateUserInterface => {
  const userRepository = new UserRepository();
  return new FetchUserById(userRepository);
};
