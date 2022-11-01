import { UserProps } from "../../../../domain/entities/user";
import { UseCase } from "../useCase";

export interface UpdateUserInterface
    extends UseCase<
        UpdateUserInterfaceNamespace.Request,
        UpdateUserInterfaceNamespace.Response
        > {
    execute(
        data: UpdateUserInterfaceNamespace.Request
    ): Promise<UpdateUserInterfaceNamespace.Response>;
}

export namespace UpdateUserInterfaceNamespace {
    export type Request = any;
    export type Response = any;
}
