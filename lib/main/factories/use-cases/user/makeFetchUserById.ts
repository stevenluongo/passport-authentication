import { CreateUserInterface } from '@application/interfaces/use-cases/user/createUserInterface';
import { FetchUserByIdInterface } from '@application/interfaces/use-cases/user/fetchUserByIdInterface';
import { FetchUserById } from '@application/use-cases/user/fetchUserById';
import { UserRepository } from '@infra/db/mongodb/repositories/UserRepository';

export const makeFetchUserById = (): FetchUserByIdInterface => {
  const userRepository = new UserRepository();
  return new FetchUserById(userRepository);
};
