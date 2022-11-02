import { DeleteUserInterface } from "../../../../application/interfaces/use-cases/user/deleteUserInterface";
import { BaseController } from "../../../controllers/baseController";
import { HttpRequest } from "../../interfaces/httpRequest";
import { HttpResponse } from "../../interfaces/httpResponse";
import { Validation } from "../../interfaces/validation";
import { accepted } from "../../responseCodes";

export class DeleteUserController extends BaseController {
    constructor(
        private readonly deleteUser: DeleteUserInterface,
        private readonly deleteUserValidation: Validation
    ) {
        super(deleteUserValidation);
    }

    async execute(
        httpRequest: DeleteUserControllerNamespace.Request
    ): Promise<DeleteUserControllerNamespace.Response> {
        const response = await this.deleteUser.execute(httpRequest.body!);
        console.log(response);
        return accepted({ statusCode: 202, success: true });
    }
}

export namespace DeleteUserControllerNamespace {
    export type Request = HttpRequest<any>;
    export type Response = HttpResponse<{ statusCode: number }>;
}
