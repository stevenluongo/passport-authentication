import { LoginSessionInterface } from '../../../../application/interfaces/use-cases/auth/loginSessionInterface';
import { BaseController } from '../../../controllers/baseController';
import { HttpRequest } from '../../interfaces/httpRequest';
import { HttpResponse } from '../../interfaces/httpResponse';
import { Validation } from '../../interfaces/validation';
import { ok } from '../../responseCodes';

export class LoginSessionController extends BaseController {
  constructor(
    private readonly loginSession: LoginSessionInterface,
    private readonly loginSessionValidation?: Validation,
  ) {
    super(loginSessionValidation);
  }

  async execute(
    httpRequest: LoginSessionControllerNamespace.Request
  ): Promise<LoginSessionControllerNamespace.Response> {
    const { user } = httpRequest;
    await this.loginSession.execute({ ...user });
    return ok({ statusCode: 200, success: true, user });
  }
}

export namespace LoginSessionControllerNamespace {
  export type Request = HttpRequest<{}>;
  export type Response = HttpResponse<{ statusCode: number, success: boolean, user; }>;
}
