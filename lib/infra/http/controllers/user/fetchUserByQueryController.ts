import { FetchUserByQueryInterface } from '@application/interfaces/use-cases/user/fetchUserByQueryInterface';
import { UserProps } from '@domain/entities/user';
import { BaseController } from '@infra/controllers/baseController';
import { HttpRequest } from '@infra/http/interfaces/httpRequest';
import { HttpResponse } from '@infra/http/interfaces/httpResponse';
import { Validation } from '@infra/http/interfaces/validation';
import { ok } from '@infra/http/responseCodes';

export class FetchUserByQueryController extends BaseController {
  constructor(
    private readonly fetchUserByQuery: FetchUserByQueryInterface,
    private readonly fetchUserByQueryValidation?: Validation
  ) {
    super(fetchUserByQueryValidation);
  }

  async execute(
    httpRequest: FetchUserByQueryControllerNamespace.Request
  ): Promise<FetchUserByQueryControllerNamespace.Response> {
    //fetch users by query
    const users = await this.fetchUserByQuery.execute(httpRequest.body!);
    //return users
    return ok({ users });
  }
}

export namespace FetchUserByQueryControllerNamespace {
  export type Request = HttpRequest;
  export type Response = HttpResponse<{ users: UserProps[] }>;
}
