import { UserProps } from '../../../domain/entities/user';

export interface CreateUserRepository {
  createPost(
    postData: CreateUserRepositoryNamespace.Request
  ): Promise<CreateUserRepositoryNamespace.Response>;
}

export namespace CreateUserRepositoryNamespace {
  export type Request = Omit<UserProps, 'password' | 'id' | 'createdAt'>;
  export type Response = string;
}
