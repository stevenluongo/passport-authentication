import { HttpRequest } from '../../interfaces/http/httpRequest';
import { HttpResponse } from '../../interfaces/http/httpResponse';
import { Validation } from '../../interfaces/http/validation';
import { badRequest, serverError } from '../http/responseCodes';

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
