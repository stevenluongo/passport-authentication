import { FetchVerificationSessionByQueryInterface } from '@application/interfaces/use-cases/verification/fetchVerificationSessionByQueryInterface';
import { BaseController } from '@infra/controllers/baseController';
import { HttpResponse } from '@infra/http/interfaces/httpResponse';
import { Validation } from '@infra/http/interfaces/validation';
import { ok } from '@infra/http/responseCodes';

export class FetchVerificationSessionByQueryController extends BaseController {
  constructor(
    private readonly fetchVerificationSessionByQuery: FetchVerificationSessionByQueryInterface,
    private readonly fetchVerificationSessionByQueryValidation?: Validation
  ) {
    super(fetchVerificationSessionByQueryValidation);
  }

  async execute(
    httpRequest: FetchVerificationSessionByQueryControllerNamespace.Request
  ): Promise<FetchVerificationSessionByQueryControllerNamespace.Response> {
    const sessions: Array<object> =
      await this.fetchVerificationSessionByQuery.execute(httpRequest.body!);
    return ok({ statusCode: 200, sessions });
  }
}

export namespace FetchVerificationSessionByQueryControllerNamespace {
  export type Request = any;
  export type Response = HttpResponse<{ statusCode: number }>;
}
