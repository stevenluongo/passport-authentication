import { FetchUserByIdInterface } from '@application/interfaces/use-cases/user/fetchUserByIdInterface';
import { BaseController } from '@infra/controllers/baseController';
import { HttpRequest } from '@infra/http/interfaces/httpRequest';
import { HttpResponse } from '@infra/http/interfaces/httpResponse';
import { Validation } from '@infra/http/interfaces/validation';
import { ok } from '@infra/http/responseCodes';

export class FetchUserByIdController extends BaseController {
  constructor(
    private readonly fetchUserById: FetchUserByIdInterface,
    private readonly fetchUserByIdValidation: Validation
  ) {
    super(fetchUserByIdValidation);
  }

  async execute(
    httpRequest: FetchUserByIdControllerNamespace.Request
  ): Promise<FetchUserByIdControllerNamespace.Response> {
    const { _id } = httpRequest!.params;
    //fetch user from database
    const user = await this.fetchUserById.execute(_id);
    //return user
    return ok({ statusCode: 200, user });
  }
}

export namespace FetchUserByIdControllerNamespace {
  export type Request = HttpRequest<{ _id: string }>;
  export type Response = HttpResponse;
}
