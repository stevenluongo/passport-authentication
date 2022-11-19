import { FetchVerificationSessionByQueryInterface } from '@application/interfaces/use-cases/verification/fetchVerificationSessionByQueryInterface';
import { BaseController } from '@infra/controllers/baseController';
import { HttpResponse } from '@infra/http/interfaces/httpResponse';
import { Validation } from '@infra/http/interfaces/validation';
import { created } from '@infra/http/responseCodes';

export class FetchVerificationSessionByQueryController extends BaseController {
  constructor(
    private readonly fetchVerificationSessionByQuery: FetchVerificationSessionByQueryInterface,
    private readonly fetchVerificationSessionByQueryValidation?: Validation
  ) {
    super(fetchVerificationSessionByQueryValidation);
  }

  async execute(
    payload: FetchVerificationSessionByQueryControllerNamespace.Request
  ): Promise<FetchVerificationSessionByQueryControllerNamespace.Response> {
    const { hash } = payload.body!;

    //create a new verification session
    await this.fetchVerificationSessionByQuery.execute({
      hash,
    });

    return created({ statusCode: 200 });
  }
}

export namespace FetchVerificationSessionByQueryControllerNamespace {
  export type Request = any;
  export type Response = HttpResponse<{ statusCode: number }>;
}
