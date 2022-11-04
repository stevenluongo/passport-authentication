import { BaseController } from '../../../controllers/baseController';
import { HttpRequest } from '../../interfaces/httpRequest';
import { HttpResponse } from '../../interfaces/httpResponse';
import { Validation } from '../../interfaces/validation';
import { ok } from '../../responseCodes';
import {FetchUserByQueryInterface} from "../../../../application/interfaces/use-cases/user/fetchUserByQueryInterface";

export class FetchUserByQueryController extends BaseController {
    constructor(
        private readonly useCase: FetchUserByQueryInterface,
        private readonly controllerValidation?: Validation
    ) {
        super(controllerValidation);
    }

    async execute(
        httpRequest: FetchUserByQueryControllerNamespace.Request
    ): Promise<FetchUserByQueryControllerNamespace.Response> {
        const users: Array<object> = await this.useCase.execute(httpRequest.body!);
        return ok({ statusCode: 200, users, success: true });
    }
}

export namespace FetchUserByQueryControllerNamespace {
    export type Request = HttpRequest;
    export type Response = HttpResponse<{ statusCode: number, success: boolean, users: Array<object> }>;
}
