import { Validation } from '@infra/http/interfaces/validation';
import { badRequest, serverError } from '@infra/http/responseCodes';

export abstract class ValidationController {
  constructor(private readonly validation?: Validation) {}

  abstract execute(payload: any): Promise<any>;

  async handle(payload: any): Promise<any> {
    try {
      const error = this.validation?.validate(payload);
      if (error) {
        return badRequest(error);
      }
      return await this.execute(payload);
    } catch (error) {
      return serverError(error);
    }
  }
}
