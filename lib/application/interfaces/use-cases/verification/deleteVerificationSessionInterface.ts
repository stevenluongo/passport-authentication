import { UseCase } from '../useCase';

export interface DeleteVerificationSessionInterface
  extends UseCase<
    DeleteVerificationSessionInterfaceNamespace.Request,
    DeleteVerificationSessionInterfaceNamespace.Response
  > {
  execute(
    payload: DeleteVerificationSessionInterfaceNamespace.Request
  ): Promise<DeleteVerificationSessionInterfaceNamespace.Response>;
}

export namespace DeleteVerificationSessionInterfaceNamespace {
  export type Request = string;
  export type Response = { acknowledged: boolean; deletedCount: number };
}
