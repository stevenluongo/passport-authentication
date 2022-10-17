import { BaseController } from '../../../infra/controllers/baseController';
import { CreatePostsController } from '../../../infra/http/controllers/createPostsController';

export const makeCreatePostsController = (): BaseController => {
  return new CreatePostsController();
};
