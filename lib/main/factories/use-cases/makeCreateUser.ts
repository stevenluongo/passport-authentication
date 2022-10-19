import { CreateUserInterface } from '../../../application/interfaces/use-cases/createPostInteface';
import { CreatePost } from '../../../application/use-cases/createPost';
import { UserRepository } from '../../../infra/db/mongodb/repositories/PostRepository';

export const makeCreateUser = (): CreateUserInterface => {
  const userRepository = new UserRepository();
  return new CreatePost(userRepository);
};
