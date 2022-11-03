import { CreateUserInterface } from '../../../../application/interfaces/use-cases/user/createUserInterface';
import { UserRepository } from '../../../../infra/db/mongodb/repositories/UserRepository';
import { FetchUserById } from '../../../../application/use-cases/user/fetchUserById';

export const makeFetchUserById = (): CreateUserInterface => {
  const userRepository = new UserRepository();
  return new FetchUserById(userRepository);
};
