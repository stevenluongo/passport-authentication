import { UseCase } from '../useCase';

export interface FetchUserByQueryInterface
    extends UseCase<
        FetchUserByQueryInterfaceNamespace.Request,
        FetchUserByQueryInterfaceNamespace.Response
        > {
    execute(
        data: FetchUserByQueryInterfaceNamespace.Request
    ): Promise<FetchUserByQueryInterfaceNamespace.Response>;
}

export namespace FetchUserByQueryInterfaceNamespace {
    export type Request = any;
    export type Response = any;
}
