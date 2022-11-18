import { UseCase } from '../useCase';

export interface FetchVerificationSessionByQueryInterface
  extends UseCase<
    FetchVerificationSessionByQueryInterfaceNamespace.Request,
    FetchVerificationSessionByQueryInterfaceNamespace.Response
  > {
  execute(
    payload: FetchVerificationSessionByQueryInterfaceNamespace.Request
  ): Promise<FetchVerificationSessionByQueryInterfaceNamespace.Response>;
}

export namespace FetchVerificationSessionByQueryInterfaceNamespace {
  export type Request = any;
  export type Response = any;
}
