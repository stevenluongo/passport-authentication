import { CreateUserInterface } from '@application/interfaces/use-cases/user/createUserInterface';
import { CreateUser } from '@application/use-cases/user/createUser';
import { UserRepository } from '@infra/db/mongodb/repositories/UserRepository';

export const makeCreateUser = (): CreateUserInterface => {
  const userRepository = new UserRepository();
  return new CreateUser(userRepository);
};
