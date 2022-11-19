import { CreateVerificationSessionInterface } from '@application/interfaces/use-cases/verification/createVerificationSessionInterface';
import { BaseController } from '@infra/controllers/baseController';
import { HttpResponse } from '@infra/http/interfaces/httpResponse';
import { Validation } from '@infra/http/interfaces/validation';
import { created } from '@infra/http/responseCodes';

export class CreateVerificationSessionController extends BaseController {
  constructor(
    private readonly createVerificationSession: CreateVerificationSessionInterface,
    private readonly createVerificationSessionValidation?: Validation
  ) {
    super(createVerificationSessionValidation);
  }

  async execute(
    payload: CreateVerificationSessionControllerNamespace.Request
  ): Promise<CreateVerificationSessionControllerNamespace.Response> {
    const { _id, username, emailAddress } = payload.body!;

    //create a new verification session
    await this.createVerificationSession.execute({
      _id,
      username,
      emailAddress,
    });

    return created({ statusCode: 201 });
  }
}

export namespace CreateVerificationSessionControllerNamespace {
  export type Request = any;
  export type Response = HttpResponse<{ statusCode: number }>;
}
