import { badRequest, serverError } from "../http/responseCodes";

import { HttpRequest } from "../http/interfaces/httpRequest";
import { HttpResponse } from "../http/interfaces/httpResponse";
import { Validation } from "../http/interfaces/validation";

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
