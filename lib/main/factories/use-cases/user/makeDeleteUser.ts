import { DeleteUserInterface } from '@application/interfaces/use-cases/user/deleteUserInterface';
import { DeleteUser } from '@application/use-cases/user/deleteUser';
import { UserRepository } from '@infra/db/mongodb/repositories/UserRepository';

export const makeDeleteUser = (): DeleteUserInterface => {
  const userRepository = new UserRepository();
  return new DeleteUser(userRepository);
};
