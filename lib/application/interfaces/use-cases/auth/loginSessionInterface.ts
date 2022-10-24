import { UserProps } from '../../../../domain/entities/user';
import { UseCase } from '../useCase';

export interface LoginSessionInterface
  extends UseCase<
    LoginSessionInterfaceNamespace.Request,
    LoginSessionInterfaceNamespace.Response
  > {
  execute(
    loginData: LoginSessionInterfaceNamespace.Request
  ): Promise<LoginSessionInterfaceNamespace.Response>;
}

export namespace LoginSessionInterfaceNamespace {
  export type Request = Omit<UserProps, 'id' | 'createdAt' | 'hash' | 'salt' | 'emailAddress'>;
  export type Response = string;
}
