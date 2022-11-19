import { UseCase } from '../useCase';

export interface CreateVerificationSessionInterface
  extends UseCase<
    CreateVerificationSessionInterfaceNamespace.Request,
    CreateVerificationSessionInterfaceNamespace.Response
  > {
  execute(
    payload: CreateVerificationSessionInterfaceNamespace.Request
  ): Promise<CreateVerificationSessionInterfaceNamespace.Response>;
}

export namespace CreateVerificationSessionInterfaceNamespace {
  export type Request = { emailAddress: string; _id: string; username: string };
  export type Response = any;
}
