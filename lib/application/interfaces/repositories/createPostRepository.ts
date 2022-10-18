import { UserProps } from '../../../domain/entities/user';

export interface CreatePostRepository {
  createPost(
    postData: CreatePostRepositoryNamespace.Request
  ): Promise<CreatePostRepositoryNamespace.Response>;
}

export namespace CreatePostRepositoryNamespace {
  export type Request = Omit<UserProps, 'password' | 'id' | 'createdAt'>;
  export type Response = string;
}
