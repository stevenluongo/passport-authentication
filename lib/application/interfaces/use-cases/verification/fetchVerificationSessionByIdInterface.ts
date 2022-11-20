import { UseCase } from '../useCase';

export interface FetchVerificationSessionByIdInterface
  extends UseCase<
    FetchVerificationSessionByIdInterfaceNamespace.Request,
    FetchVerificationSessionByIdInterfaceNamespace.Response
  > {
  execute(
    payload: FetchVerificationSessionByIdInterfaceNamespace.Request
  ): Promise<FetchVerificationSessionByIdInterfaceNamespace.Response>;
}

export namespace FetchVerificationSessionByIdInterfaceNamespace {
  export type Request = string;
  export type Response = any;
}
