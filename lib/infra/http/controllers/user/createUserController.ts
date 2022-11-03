import { CreateUserInterface } from '../../../../application/interfaces/use-cases/user/createUserInterface';
import { BaseController } from '../../../controllers/baseController';
import { HttpRequest } from '../../interfaces/httpRequest';
import { HttpResponse } from '../../interfaces/httpResponse';
import { Validation } from '../../interfaces/validation';
import { ok } from '../../responseCodes';

export class CreateUserController extends BaseController {
  constructor(
    private readonly createUser: CreateUserInterface,
    private readonly createPostValidation?: Validation
  ) {
    super(createPostValidation);
  }

  async execute(
    httpRequest: CreateUserControllerNamespace.Request
  ): Promise<CreateUserControllerNamespace.Response> {
    const { emailAddress, username, password, salt, hash } = httpRequest.body!;
    const user = await this.createUser.execute({
      emailAddress,
      username,
      password,
      salt,
      hash,
    });
    return ok({ statusCode: 200, user, success: true });
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
