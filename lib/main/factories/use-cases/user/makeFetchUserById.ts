import { CreateUserInterface } from "../../../../application/interfaces/use-cases/createUserInterface";
import { UserRepository } from "../../../../infra/db/mongodb/repositories/PostRepository";
import { FetchUserById } from "../../../../application/use-cases/user/fetchUserById";

export const makeFetchUserById = (): CreateUserInterface => {
  const userRepository = new UserRepository();
  return new FetchUserById(userRepository);
};
