import { HttpRequest } from '@infra/http/interfaces/httpRequest';
import { HttpResponse } from '@infra/http/interfaces/httpResponse';
import { Validation } from '@infra/http/interfaces/validation';
import { badRequest, serverError } from '@infra/http/responseCodes';

export abstract class BaseController {
  constructor(private readonly validation?: Validation) {}

  abstract execute(httpRequest: HttpRequest): Promise<HttpResponse>;

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation?.validate(httpRequest);
      if (error) {
        return badRequest(error);
      }
      return await this.execute(httpRequest);
    } catch (error) {
      return serverError(error);
    }
  }
}
