import { UserProps } from '../../../../domain/entities/user';

export interface CreateUserRepository {
  createUser(
    postData: CreateUserRepositoryNamespace.Request
  ): Promise<CreateUserRepositoryNamespace.Response>;
}

export namespace CreateUserRepositoryNamespace {
  export type Request = any;
  export type Response = Omit<UserProps, 'password' | 'salt' | 'hash'>;
}
