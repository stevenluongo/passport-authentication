import { BaseController } from "../../../controllers/baseController";
import { HttpRequest } from "../../interfaces/httpRequest";
import { HttpResponse } from "../../interfaces/httpResponse";
import { Validation } from "../../interfaces/validation";
import { ok } from "../../responseCodes";
import { FetchUserByIdInterface } from "../../../../application/interfaces/use-cases/user/fetchUserByIdInterface";

export class FetchUserByIdController extends BaseController {
  constructor(
    private readonly fetchUserById: FetchUserByIdInterface,
    private readonly fetchUserByIdValidation: Validation
  ) {
    super(fetchUserByIdValidation);
  }

  async execute(
    httpRequest: FetchUserByIdControllerNamespace.Request
  ): Promise<FetchUserByIdControllerNamespace.Response> {
    const { id } = httpRequest.body!;
    const user = await this.fetchUserById.execute({ id });
    return ok({ statusCode: 200, user, success: true });
  }
}

export namespace FetchUserByIdControllerNamespace {
  export type Request = HttpRequest<{ id: string }>;
  export type Response = HttpResponse<{ statusCode: number }>;
}
