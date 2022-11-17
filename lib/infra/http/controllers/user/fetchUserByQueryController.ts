import { FetchUserByQueryInterface } from '@application/interfaces/use-cases/user/fetchUserByQueryInterface';
import { BaseController } from '@infra/controllers/baseController';
import { HttpRequest } from '@infra/http/interfaces/httpRequest';
import { HttpResponse } from '@infra/http/interfaces/httpResponse';
import { Validation } from '@infra/http/interfaces/validation';
import { ok } from '@infra/http/responseCodes';

export class FetchUserByQueryController extends BaseController {
  constructor(
    private readonly useCase: FetchUserByQueryInterface,
    private readonly controllerValidation?: Validation
  ) {
    super(controllerValidation);
  }

  async execute(
    httpRequest: FetchUserByQueryControllerNamespace.Request
  ): Promise<FetchUserByQueryControllerNamespace.Response> {
    const users: Array<object> = await this.useCase.execute(httpRequest.body!);
    return ok({ statusCode: 200, users });
  }
}

export namespace FetchUserByQueryControllerNamespace {
  export type Request = HttpRequest;
  export type Response = HttpResponse<{
    statusCode: number;
    users: Array<object>;
  }>;
}
