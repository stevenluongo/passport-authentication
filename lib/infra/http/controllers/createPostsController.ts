import { CreatePostInterface } from '../../../application/interfaces/use-cases/createPostInteface';
import { BaseController } from '../../controllers/baseController';
import { HttpRequest } from '../interfaces/httpRequest';
import { HttpResponse } from '../interfaces/httpResponse';
import { Validation } from '../interfaces/validation';
import { ok } from '../responseCodes';

export class CreatePostController extends BaseController {
  constructor(
    private readonly createPostValidation: Validation,
    private readonly createPost: CreatePostInterface
  ) {
    super(createPostValidation);
  }

  async execute(
    httpRequest: CreatePostControllerNamespace.Request
  ): Promise<CreatePostControllerNamespace.Response> {
    const { emailAddress, username, password, salt, hash } = httpRequest.body!;
    const id = await this.createPost.execute({
      emailAddress,
      username,
      password,
      salt,
      hash,
    });
    return ok({ statusCode: 200, id });
  }
}

export namespace CreatePostControllerNamespace {
  export type Request = HttpRequest<{
    emailAddress;
    username;
    password;
    salt;
    hash;
  }>;
  export type Response = HttpResponse<{ statusCode: number }>;
}
