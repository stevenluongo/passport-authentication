import { BaseController } from '../../../infra/controllers/baseController';
import { CreatePostController } from '../../../infra/http/controllers/createPostsController';
import { makeCreatePost } from '../use-cases/makeCreatePosts';
import { makeCreatePostValidation } from './makeCreatePostValidation';

export const makeCreatePostsController = (): BaseController => {
  const validation = makeCreatePostValidation();
  const useCase = makeCreatePost();
  return new CreatePostController(validation, useCase);
};
