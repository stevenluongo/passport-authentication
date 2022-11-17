import { DeleteUserInterface } from '@application/interfaces/use-cases/user/deleteUserInterface';
import { BaseController } from '@infra/controllers/baseController';
import { HttpRequest } from '@infra/http/interfaces/httpRequest';
import { HttpResponse } from '@infra/http/interfaces/httpResponse';
import { Validation } from '@infra/http/interfaces/validation';
import {
  accepted,
  badRequest,
  nothingModified,
} from '@infra/http/responseCodes';

export class DeleteUserController extends BaseController {
  constructor(
    private readonly deleteUser: DeleteUserInterface,
    private readonly deleteUserValidation: Validation
  ) {
    super(deleteUserValidation);
  }

  async execute(
    httpRequest: DeleteUserControllerNamespace.Request
  ): Promise<DeleteUserControllerNamespace.Response> {
    try {
      //extract id and body from http request
      const { id } = httpRequest!.params;

      //delete user in database
      const { acknowledged, deletedCount } = await this.deleteUser.execute(id);

      //request was not acknowledged
      if (!acknowledged) return badRequest(new Error('User not found.'));

      //nothing was deleted
      if (!deletedCount) return nothingModified({});

      //success
      return accepted({ statusCode: 202 });
    } catch (e) {
      //handle exceptions
      return badRequest(e);
    }
  }
}

export namespace DeleteUserControllerNamespace {
  export type Request = HttpRequest<any>;
  export type Response = HttpResponse<any>;
}
