import { CreateUserInterface } from '../../../application/interfaces/use-cases/createPostInteface';
import { BaseController } from '../../controllers/baseController';
import { HttpRequest } from '../interfaces/httpRequest';
import { HttpResponse } from '../interfaces/httpResponse';
import { Validation } from '../interfaces/validation';
import { ok } from '../responseCodes';

export class CreateUserController extends BaseController {
  constructor(
    private readonly createPostValidation: Validation,
    private readonly createUser: CreateUserInterface
  ) {
    super(createPostValidation);
  }

  async execute(
    httpRequest: CreateUserControllerNamespace.Request
  ): Promise<CreateUserControllerNamespace.Response> {
    const { emailAddress, username, password, salt, hash } = httpRequest.body!;
    const id = await this.createUser.execute({
      emailAddress,
      username,
      password,
      salt,
      hash,
    });
    return ok({ statusCode: 200, id });
  }
}

export namespace CreateUserControllerNamespace {
  export type Request = HttpRequest<{
    emailAddress;
    username;
    password;
    salt;
    hash;
  }>;
  export type Response = HttpResponse<{ statusCode: number }>;
}