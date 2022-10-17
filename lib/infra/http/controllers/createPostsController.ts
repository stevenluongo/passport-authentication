import { BaseController } from '../../controllers/baseController';
import { HttpRequest } from '../../interfaces/httpRequest';
import { HttpResponse } from '../../interfaces/httpResponse';
import { ok } from '../responseCodes';

export class CreatePostsController extends BaseController {
  async execute(
    httpRequest: CreatePostsControllerNamespace.Request
  ): Promise<CreatePostsControllerNamespace.Response> {
    return ok({ statusCode: 200, body: { message: 'response' } });
  }
}

export namespace CreatePostsControllerNamespace {
  export type Request = HttpRequest<undefined, { id: string }>;
  export type Response = HttpResponse<{ statusCode: number }>;
}
