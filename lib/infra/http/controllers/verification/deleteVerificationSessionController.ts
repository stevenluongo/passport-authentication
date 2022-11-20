import { DeleteVerificationSessionInterface } from '@application/interfaces/use-cases/verification/deleteVerificationSessionInterface';
import { BaseController } from '@infra/controllers/baseController';
import { HttpRequest } from '@infra/http/interfaces/httpRequest';
import { HttpResponse } from '@infra/http/interfaces/httpResponse';
import { Validation } from '@infra/http/interfaces/validation';
import { badRequest, nothingModified, ok } from '@infra/http/responseCodes';

export class DeleteVerificationSessionController extends BaseController {
  constructor(
    private readonly deleteVerificationSession: DeleteVerificationSessionInterface,
    private readonly deleteVerificationSessionValidation?: Validation
  ) {
    super(deleteVerificationSessionValidation);
  }

  async execute(
    httpRequest: DeleteVerificationSessionControllerNamespace.Request
  ): Promise<DeleteVerificationSessionControllerNamespace.Response> {
    const { _id } = httpRequest.params!;

    const { acknowledged, deletedCount } =
      await this.deleteVerificationSession.execute(_id);

    //request was not acknowledged
    if (!acknowledged) return badRequest(new Error('User not found.'));

    //nothing was deleted
    if (!deletedCount) return nothingModified({});

    return ok({ statusCode: 200 });
  }
}

export namespace DeleteVerificationSessionControllerNamespace {
  export type Request = HttpRequest<{ _id: string }>;
  export type Response = HttpResponse<any>;
}
