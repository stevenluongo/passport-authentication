import { BaseController } from '../infra/controllers/baseController';
import { ok } from '../infra/http/responseCodes';
import { HttpRequest } from '../interfaces/http/httpRequest';
import { HttpResponse } from '../interfaces/http/httpResponse';

export const PostsController = (): BaseController => {
  return new ReturnPostsController();
};

class ReturnPostsController extends BaseController {
  async execute(
    httpRequest: ReturnPostsControllerNamespace.Request
  ): Promise<ReturnPostsControllerNamespace.Response> {
    return ok({ statusCode: 200, body: { message: 'response' } });
  }
}

export namespace ReturnPostsControllerNamespace {
  export type Request = HttpRequest<undefined, { id: string }>;
  export type Response = HttpResponse<{ statusCode: number }>;
}
