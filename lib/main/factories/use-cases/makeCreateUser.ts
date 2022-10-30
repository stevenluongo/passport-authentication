import { CreateUserInterface } from "../../../application/interfaces/use-cases/createUserInterface";
import { CreateUser } from "../../../application/use-cases/createUser";
import { UserRepository } from "../../../infra/db/mongodb/repositories/PostRepository";

export const makeCreateUser = (): CreateUserInterface => {
  const userRepository = new UserRepository();
  return new CreateUser(userRepository);
};
