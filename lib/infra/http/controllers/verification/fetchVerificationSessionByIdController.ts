import { FetchVerificationSessionByQueryInterface } from '@application/interfaces/use-cases/verification/fetchVerificationSessionByQueryInterface';
import { BaseController } from '@infra/controllers/baseController';
import { HttpRequest } from '@infra/http/interfaces/httpRequest';
import { HttpResponse } from '@infra/http/interfaces/httpResponse';
import { Validation } from '@infra/http/interfaces/validation';
import { ok } from '@infra/http/responseCodes';

export class FetchVerificationSessionByIdController extends BaseController {
  constructor(
    private readonly fetchVerificationSessionById: FetchVerificationSessionByQueryInterface,
    private readonly fetchVerificationSessionByIdValidation?: Validation
  ) {
    super(fetchVerificationSessionByIdValidation);
  }

  async execute(
    httpRequest: FetchVerificationSessionByIdControllerNamespace.Request
  ): Promise<FetchVerificationSessionByIdControllerNamespace.Response> {
    const { _id } = httpRequest.params!;
    const session = await this.fetchVerificationSessionById.execute(_id);
    return ok({ statusCode: 200, session });
  }
}

export namespace FetchVerificationSessionByIdControllerNamespace {
  export type Request = HttpRequest<{ _id: string }>;
  export type Response = HttpResponse<{ statusCode: number }>;
}
