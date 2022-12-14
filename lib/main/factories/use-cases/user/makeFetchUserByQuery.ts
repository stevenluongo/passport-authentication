import { FetchUserByQueryInterface } from '@application/interfaces/use-cases/user/fetchUserByQueryInterface';
import { FetchUserByQuery } from '@application/use-cases/user/fetchUserByQuery';
import { UserRepository } from '@infra/db/mongodb/repositories/UserRepository';

export const makeFetchUserByQuery = (): FetchUserByQueryInterface => {
  const userRepository = new UserRepository();
  return new FetchUserByQuery(userRepository);
};
