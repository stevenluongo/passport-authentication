import { UseCase } from '../useCase';

export interface FetchUserByIdInterface
  extends UseCase<
    FetchUserByIdInterfaceNamespace.Request,
    FetchUserByIdInterfaceNamespace.Response
  > {
  execute(
    data: FetchUserByIdInterfaceNamespace.Request
  ): Promise<FetchUserByIdInterfaceNamespace.Response>;
}

export namespace FetchUserByIdInterfaceNamespace {
  export type Request = string;
  export type Response = any;
}
