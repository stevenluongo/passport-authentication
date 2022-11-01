import { BaseController } from "../../../controllers/baseController";
import { HttpRequest } from "../../interfaces/httpRequest";
import { HttpResponse } from "../../interfaces/httpResponse";
import { Validation } from "../../interfaces/validation";
import { ok } from "../../responseCodes";
import {UpdateUserInterface} from "../../../../application/interfaces/use-cases/user/updateUserInterface";

export class UpdateUserController extends BaseController {
    constructor(
        private readonly updateUser: UpdateUserInterface,
        private readonly updateUserValidation: Validation
    ) {
        super(updateUserValidation);
    }

    async execute(
        httpRequest: FetchUserByIdControllerNamespace.Request
    ): Promise<FetchUserByIdControllerNamespace.Response> {
        const user = await this.updateUser.execute(httpRequest.body!);
        return ok({ statusCode: 200, user, success: true });
    }
}

export namespace FetchUserByIdControllerNamespace {
    export type Request = HttpRequest<any>;
    export type Response = HttpResponse<{ statusCode: number }>;
}
