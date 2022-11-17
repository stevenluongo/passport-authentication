import { UpdateUserInterface } from '@application/interfaces/use-cases/user/updateUserInterface';
import { UpdateUser } from '@application/use-cases/user/updateUser';
import { UserRepository } from '@infra/db/mongodb/repositories/UserRepository';

export const makeUpdateUser = (): UpdateUserInterface => {
  const userRepository = new UserRepository();
  return new UpdateUser(userRepository);
};
