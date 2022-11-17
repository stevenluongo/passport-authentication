import { UpdateUserInterface } from '@application/interfaces/use-cases/user/updateUserInterface';
import { BaseController } from '@infra/controllers/baseController';
import { HttpRequest } from '@infra/http/interfaces/httpRequest';
import { HttpResponse } from '@infra/http/interfaces/httpResponse';
import { Validation } from '@infra/http/interfaces/validation';
import {
  badRequest,
  notFound,
  nothingModified,
  ok,
} from '@infra/http/responseCodes';

export class UpdateUserController extends BaseController {
  constructor(
    private readonly updateUser: UpdateUserInterface,
    private readonly updateUserValidation: Validation
  ) {
    super(updateUserValidation);
  }

  async execute(
    httpRequest: FetchUserByIdControllerNamespace.Request
  ): Promise<FetchUserByIdControllerNamespace.Response> {
    try {
      //extract id and body from http request
      const { id } = httpRequest!.params;
      const { body } = httpRequest!;

      //update user in database
      const { acknowledged, modifiedCount, matchedCount } =
        await this.updateUser.execute({ id, body });

      //no user found
      if (!matchedCount) return notFound(new Error('User not found.'));

      //nothing modified
      if (acknowledged && !modifiedCount) return nothingModified({});

      //success
      return ok({ statusCode: 200, message: 'User successfully updated.' });
    } catch (e) {
      //handle exceptions
      return badRequest(e);
    }
  }
}

export namespace FetchUserByIdControllerNamespace {
  export type Request = HttpRequest<any>;
  export type Response = HttpResponse<any>;
}
