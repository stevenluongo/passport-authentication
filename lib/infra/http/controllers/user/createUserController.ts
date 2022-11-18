import { CreateUserInterface } from '@application/interfaces/use-cases/user/createUserInterface';
import { BaseController } from '@infra/controllers/baseController';
import { HttpRequest } from '@infra/http/interfaces/httpRequest';
import { HttpResponse } from '@infra/http/interfaces/httpResponse';
import { Validation } from '@infra/http/interfaces/validation';
import { makeCreateVerificationSessionController } from '@main/factories/controllers/verification/makeCreateVerificationSessionController';

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

    return await makeCreateVerificationSessionController().handle({ user });
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
