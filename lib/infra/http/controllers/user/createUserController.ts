import {
  CreateUserInterface,
  CreateUserInterfaceNamespace,
} from '@application/interfaces/use-cases/user/createUserInterface';
import { BaseController } from '@infra/controllers/baseController';
import { HttpRequest } from '@infra/http/interfaces/httpRequest';
import { HttpResponse } from '@infra/http/interfaces/httpResponse';
import { Validation } from '@infra/http/interfaces/validation';
import { created } from '@infra/http/responseCodes';

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
    const { emailAddress, username, password } = httpRequest.body!;
    const user = await this.createUser.execute({
      emailAddress,
      username,
      password,
    });
    return created({ statusCode: 201, user });
  }
}

export namespace CreateUserControllerNamespace {
  export type Request = HttpRequest<CreateUserInterfaceNamespace.Request>;
  export type Response = HttpResponse<{ statusCode: number }>;
}
