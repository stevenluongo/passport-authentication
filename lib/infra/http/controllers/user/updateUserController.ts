import { UpdateUserInterface } from '@application/interfaces/use-cases/user/updateUserInterface';
import { BaseController } from '@infra/controllers/baseController';
import { HttpRequest } from '@infra/http/interfaces/httpRequest';
import { HttpResponse } from '@infra/http/interfaces/httpResponse';
import { Validation } from '@infra/http/interfaces/validation';
import { notFound, nothingModified, ok } from '@infra/http/responseCodes';

export class UpdateUserController extends BaseController {
  constructor(
    private readonly updateUser: UpdateUserInterface,
    private readonly updateUserValidation: Validation
  ) {
    super(updateUserValidation);
  }

  async execute(
    httpRequest: UpdateUserControllerNamespace.Request
  ): Promise<UpdateUserControllerNamespace.Response> {
    const { _id } = httpRequest!.params;
    const filter = httpRequest!.body;

    //update user in database
    const { acknowledged, modifiedCount, matchedCount } =
      await this.updateUser.execute({ _id, filter });

    //no user found
    if (!matchedCount) return notFound(new Error('User not found.'));

    //nothing modified
    if (acknowledged && !modifiedCount) return nothingModified({});

    //success
    return ok({ statusCode: 200, message: 'User successfully updated.' });
  }
}

export namespace UpdateUserControllerNamespace {
  export type Request = HttpRequest<{ _id: string }>;
  export type Response = HttpResponse<any>;
}
