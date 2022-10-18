import { CreatePostInterface } from '../../../application/interfaces/use-cases/createPostInteface';
import { CreatePost } from '../../../application/use-cases/createPost';
import { PostRepository } from '../../../infra/db/mongodb/repositories/PostRepository';

export const makeCreatePost = (): CreatePostInterface => {
  const postRepository = new PostRepository();
  return new CreatePost(postRepository);
};
