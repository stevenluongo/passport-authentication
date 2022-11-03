import { BaseController } from '../../../controllers/baseController';
import { HttpRequest } from '../../interfaces/httpRequest';
import { HttpResponse } from '../../interfaces/httpResponse';
import { Validation } from '../../interfaces/validation';
import { notFound, nothingModified, ok } from '../../responseCodes';
import { UpdateUserInterface } from '../../../../application/interfaces/use-cases/user/updateUserInterface';

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
    const { acknowledged, modifiedCount, matchedCount } =
      await this.updateUser.execute(httpRequest.body!);
    if (!matchedCount) {
      console.log('here');
      return notFound(new Error('User not found.'));
    }
    if (acknowledged && !modifiedCount) {
      return nothingModified({
        statusCode: 304,
        success: true,
        message: 'Nothing was modified.',
      });
    }
    return ok({ statusCode: 200, message: 'User successfully updated.' });
  }
}

export namespace FetchUserByIdControllerNamespace {
  export type Request = HttpRequest<any>;
  export type Response = HttpResponse<any>;
}
