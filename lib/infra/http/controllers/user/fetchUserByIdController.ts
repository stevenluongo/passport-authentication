import { FetchUserByIdInterface } from '../../../../application/interfaces/use-cases/user/fetchUserByIdInterface';
import { BaseController } from '../../../controllers/baseController';
import { HttpRequest } from '../../interfaces/httpRequest';
import { HttpResponse } from '../../interfaces/httpResponse';
import { Validation } from '../../interfaces/validation';
import { badRequest, ok } from '../../responseCodes';

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
    try {
      //extract id from http request params
      const { id } = httpRequest.params!;
      //fetch user from database
      const user = await this.fetchUserById.execute(id);
      //return user
      return ok({ statusCode: 200, user });
    } catch (e) {
      return badRequest(e);
    }
  }
}

export namespace FetchUserByIdControllerNamespace {
  export type Request = HttpRequest<{ id: string }>;
  export type Response = HttpResponse;
}
