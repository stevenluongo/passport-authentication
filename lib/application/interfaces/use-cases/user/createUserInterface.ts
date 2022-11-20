import { UserProps } from '@domain/entities/user';
import { UseCase } from '../useCase';

export interface CreateUserInterface
  extends UseCase<
    CreateUserInterfaceNamespace.Request,
    CreateUserInterfaceNamespace.Response
  > {
  execute(
    postData: CreateUserInterfaceNamespace.Request
  ): Promise<CreateUserInterfaceNamespace.Response>;
}

export namespace CreateUserInterfaceNamespace {
  export type Request = Omit<UserProps, 'salt' | 'hash' | 'createdAt'>;
  export type Response = Omit<UserProps, 'password' | 'salt' | 'hash'>;
}
