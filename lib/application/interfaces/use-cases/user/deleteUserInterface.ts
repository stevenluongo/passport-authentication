import { UseCase } from "../useCase";

export interface DeleteUserInterface
    extends UseCase<
        DeleteUserInterfaceNamespace.Request,
        DeleteUserInterfaceNamespace.Response
        > {
    execute(
        data: DeleteUserInterfaceNamespace.Request
    ): Promise<DeleteUserInterfaceNamespace.Response>;
}

export namespace DeleteUserInterfaceNamespace {
    export type Request = any;
    export type Response = any;
}
