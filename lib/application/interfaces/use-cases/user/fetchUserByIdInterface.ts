import { UserProps } from '../../../../domain/entities/user';
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
  export type Request = any;
  export type Response = any;
}
